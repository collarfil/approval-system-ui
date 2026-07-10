import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { escalateRequest } from "../services/approval.service";

export const useEscalateRequest = (approverId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: escalateRequest,
        onSuccess: () => {
            toast.success("Workflow stage successfully escalated.");
            queryClient.invalidateQueries({ queryKey: ["approvals", approverId] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Execution exception encountered during escalation.";
            toast.error(message);
        },
    });
};