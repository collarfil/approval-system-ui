import { useQuery } from "@tanstack/react-query";

import { workflowDefinitionService } from "../services/workflowDefinition.service";

export function useWorkflowDefinitions() {
    return useQuery({
        queryKey: ["workflow-definitions"],
        queryFn: workflowDefinitionService.getAll,
    });
}