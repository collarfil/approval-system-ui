import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { rejectRequest } from "../services/approval.service";

export const useRejectRequest = (approverId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rejectRequest,
        onSuccess: () => {
            toast.success("Request rejected.");
            queryClient.invalidateQueries({ queryKey: ["approvals", approverId] });
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Execution exception encountered during rejection.";
            toast.error(message);
        },
    });
};