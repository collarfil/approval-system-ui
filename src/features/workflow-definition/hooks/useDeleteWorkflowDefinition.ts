import { useMutation, useQueryClient } from "@tanstack/react-query";

import { workflowDefinitionService } from "../services/workflowDefinition.service";

export function useDeleteWorkflowDefinition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: workflowDefinitionService.delete,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["workflow-definitions"],
            });
        },
    });
}