export interface Request {
    id: string;

    title: string;

    description: string;

    amount: number;

    status: string;

    workflowDefinitionId: string;

    createdAt: string;
}

export interface CreateRequestRequest {
    title: string;

    description: string;

    amount: number;

    workflowDefinitionId: string;
}

export interface UpdateRequestRequest {
    title: string;

    description: string;

    amount: number;
}