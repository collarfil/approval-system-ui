import { http } from "@/shared/api/http";

import type {
    PendingApproval,
    ApproveRequestDto,
    RejectRequestDto,
    EscalateRequestDto,
} from "../types/approval.types";

/**
 * Get all pending approvals assigned to a particular approver
 */
export const getApprovals = async (
    approverId: string
): Promise<PendingApproval[]> => {

    const response = await http.get<PendingApproval[]>(
        `/Approval/pending/${approverId}`
    );

    return response.data;
};

/**
 * Approve a request
 */
export const approveRequest = async (
    data: ApproveRequestDto
) => {

    const response = await http.post(
        "/Approval/approve",
        data
    );

    return response.data;
};

/**
 * Reject a request
 */
export const rejectRequest = async (
    data: RejectRequestDto
) => {

    const response = await http.post(
        "/Approval/reject",
        data
    );

    return response.data;
};

/**
 * Escalate a request
 */
export const escalateRequest = async (
    data: EscalateRequestDto
) => {

    const response = await http.post(
        "/Approval/escalate",
        data
    );

    return response.data;
};