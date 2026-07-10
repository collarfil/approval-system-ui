import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApproveRequest } from "../hooks/useApproveRequest";
import { useRejectRequest } from "../hooks/useRejectRequest";
import { useEscalateRequest } from "../hooks/useEscalateRequest";
import type { PendingApproval } from "../types/approval.types";

interface Props {
    open: boolean;
    onClose: () => void;
    approval: PendingApproval;
    approverId: string;
}

interface FormData {
    comment: string;
}

export default function ApprovalActionModal({ open, onClose, approval, approverId }: Props) {
    const approve = useApproveRequest(approverId);
    const reject = useRejectRequest(approverId);
    const escalate = useEscalateRequest(approverId);

    const [action, setAction] = useState<"approve" | "reject" | "escalate">("approve");
    const { register, handleSubmit, reset } = useForm<FormData>();

    useEffect(() => {
        if (!open) {
            reset();
            setAction("approve");
        }
    }, [open, reset]);

    if (!open) return null;

    const isSubmitting = approve.isPending || reject.isPending || escalate.isPending;

    const onSubmit = (data: FormData) => {
        const payload = {
            requestId: approval.requestId,
            approverId,
        };

        if (action === "approve") {
            approve.mutate({ ...payload, comment: data.comment }, { onSuccess: onClose });
        } else if (action === "reject") {
            reject.mutate({ ...payload, reason: data.comment }, { onSuccess: onClose });
        } else if (action === "escalate") {
            escalate.mutate({ ...payload, reason: data.comment }, { onSuccess: onClose });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-100 px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Review Approval Step</h2>
                    <button onClick={onClose} disabled={isSubmitting} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>

                <div className="space-y-6 p-6 max-h-[85vh] overflow-y-auto">
                    <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-4">
                        <h3 className="text-lg font-bold text-blue-950">{approval.title}</h3>
                        <p className="mt-1 text-sm text-blue-800 leading-relaxed">{approval.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4 text-sm border border-gray-100">
                        <div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Requester</span>
                            <span className="font-medium text-gray-800">{approval.requestedByName}</span>
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Assigned Queue</span>
                            <span className="font-medium text-gray-800">{approval.assignedToName}</span>
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Amount</span>
                            <span className="font-bold text-emerald-700">₦{approval.amount.toLocaleString()}</span>
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Workflow Level</span>
                            <span className="font-medium text-gray-800">Step #{approval.stepOrder}</span>
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Status</span>
                            <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800">
                                {approval.status}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Date Submitted</span>
                            <span className="font-medium text-gray-800">{new Date(approval.createdAt).toLocaleString()}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-t border-gray-100 pt-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Execution Action</label>
                            <select
                                value={action}
                                disabled={isSubmitting}
                                onChange={(e) => setAction(e.target.value as any)}
                                className="w-full rounded-lg border-gray-200 border p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            >
                                <option value="approve">🟢 Approve Request</option>
                                <option value="reject">🔴 Reject Request</option>
                                <option value="escalate">🟡 Escalate Workflow Stage</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                {action === "approve" ? "Review Comments (Optional)" : "Reason for Action (Required)"}
                            </label>
                            <textarea
                                rows={4}
                                disabled={isSubmitting}
                                placeholder={action === "approve" ? "Add execution or routing details..." : "Provide detailed rationale for audit trail validation..."}
                                {...register("comment", { required: action !== "approve" })}
                                className="w-full rounded-lg border-gray-200 border p-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            />
                        </div>

                        <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`rounded-lg px-5 py-2 text-sm font-medium text-white shadow-sm transition-all flex items-center gap-2 ${
                                    action === "approve" ? "bg-emerald-600 hover:bg-emerald-700" :
                                    action === "reject" ? "bg-rose-600 hover:bg-rose-700" : "bg-amber-600 hover:bg-amber-700"
                                } disabled:opacity-40`}
                            >
                                {isSubmitting ? "Processing..." : "Confirm Action"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}