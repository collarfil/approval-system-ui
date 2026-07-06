import { http } from "@/shared/api/http";

import type {
    WorkflowDefinition,
    CreateWorkflowRequest,
} from "../types/workflow.types";

export const getWorkflows = async (): Promise<WorkflowDefinition[]> => {

    const response = await http.get<WorkflowDefinition[]>(
        "/WorkflowDefinition"
    );

    return response.data;
};

export const createWorkflow = async (
    data: CreateWorkflowRequest
): Promise<WorkflowDefinition> => {

    const response = await http.post<WorkflowDefinition>(
        "/WorkflowDefinition",
        data
    );

    return response.data;
};

export const deleteWorkflow = async (
    id: string
): Promise<void> => {

    await http.delete(`/WorkflowDefinition/${id}`);
};