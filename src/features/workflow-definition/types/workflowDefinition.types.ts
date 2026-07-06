export interface WorkflowDefinition {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
}

export interface CreateWorkflowDefinitionRequest {
    name: string;
    description: string;
}