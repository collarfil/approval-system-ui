import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { useApprovals } from "../hooks/useApprovals";
import ApprovalActionModal from "./ApprovalActionModal";
import type { PendingApproval } from "../types/approval.types";

interface Props {
    approverId: string;
}

export default function ApprovalTable({ approverId }: Props) {
    const [open, setOpen] = useState(false);
    const [selectedApproval, setSelectedApproval] = useState<PendingApproval | null>(null);

    const { data: approvals = [], isLoading, isError } = useApprovals(approverId);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center rounded-xl bg-white p-12 shadow border border-gray-100 text-gray-400 gap-3">
                <Loader2 className="animate-spin text-blue-600" size={22} />
                <span className="text-sm font-medium">Loading execution pipeline...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl bg-red-50 p-6 border border-red-100 shadow-sm text-red-700 text-sm font-semibold">
                ⚠️ Failed to construct current pending approval views. Verify service connectivity.
            </div>
        );
    }

    return (
        <>
            <div className="overflow-hidden rounded-xl bg-white shadow border border-gray-100">
                <div className="border-b border-gray-100 p-6 bg-gray-50/50 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Pending Actions Queue</h2>
                    <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                        {approvals.length} pending
                    </span>
                </div>

                {approvals.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 text-sm">
                        No pending items require your immediate authorization profile.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                                    <th className="px-6 py-3.5">Context Title</th>
                                    <th className="px-6 py-3.5">Requester</th>
                                    <th className="px-6 py-3.5">Amount</th>
                                    <th className="px-6 py-3.5">Workflow Step</th>
                                    <th className="px-6 py-3.5">Pipeline Status</th>
                                    <th className="px-6 py-3.5 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {approvals.map((item) => (
                                    <tr key={item.approvalStepId} className="hover:bg-gray-50/40 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-gray-900">{item.title}</td>
                                        <td className="px-6 py-4 text-gray-600">{item.requestedByName}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">₦{item.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-gray-600">
                                                Stage {item.stepOrder}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => {
                                                    setSelectedApproval(item);
                                                    setOpen(true);
                                                }}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
                                            >
                                                <CheckCircle size={16} />
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {selectedApproval && (
                <ApprovalActionModal
                    open={open}
                    approval={selectedApproval}
                    approverId={approverId}
                    onClose={() => {
                        setOpen(false);
                        setSelectedApproval(null);
                    }}
                />
            )}
        </>
    );
}