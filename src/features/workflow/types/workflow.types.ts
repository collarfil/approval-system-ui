export interface WorkflowDefinition {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
}

export interface CreateWorkflowRequest {
    name: string;
    description: string;
}