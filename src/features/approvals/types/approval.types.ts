export interface ApproveRequestDto {
    requestId: string;
    approverId: string;
    comment: string;
}

export interface RejectRequestDto {
    requestId: string;
    approverId: string;
    reason: string;
}

export interface EscalateRequestDto {
    requestId: string;
    approverId: string;
    reason: string;
}
export interface PendingApproval {
    approvalStepId: string;
    requestId: string;

    title: string;
    description: string;

    amount: number;

    status: string;

    stepOrder: number;

    requestedById: string;
    requestedByName: string;

    assignedToUserId: string;
    assignedToName: string;

    createdAt: string;
}