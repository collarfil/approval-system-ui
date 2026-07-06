import { http } from "@/shared/api/http";

import type {
    WorkflowDefinition,
    CreateWorkflowDefinitionRequest,
} from "../types/workflowDefinition.types";

export const workflowDefinitionService = {
    async getAll(): Promise<WorkflowDefinition[]> {
        const { data } = await http.get(
            "/WorkflowDefinition"
        );

        return data;
    },

    async create(
        request: CreateWorkflowDefinitionRequest
    ): Promise<WorkflowDefinition> {
        const { data } = await http.post(
            "/WorkflowDefinition",
            request
        );

        return data;
    },

    async delete(id: string): Promise<void> {
        await http.delete(
            `/WorkflowDefinition/${id}`
        );
    },
};