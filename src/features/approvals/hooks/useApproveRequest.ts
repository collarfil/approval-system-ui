import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { approveRequest } from "../services/approval.service";

export const useApproveRequest = (approverId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: approveRequest,
        onSuccess: () => {
            toast.success("Request successfully approved.");
            queryClient.invalidateQueries({ queryKey: ["approvals", approverId] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Execution exception encountered during approval.";
            toast.error(message);
        },
    });
};