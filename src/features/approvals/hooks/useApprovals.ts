import { useQuery } from "@tanstack/react-query";
import { getApprovals } from "../services/approval.service";
import type { PendingApproval } from "../types/approval.types";

export const useApprovals = (approverId: string) => {
    return useQuery<PendingApproval[]>({
        queryKey: ["approvals", approverId],
        queryFn: () => getApprovals(approverId),
        enabled: !!approverId,
    });
};