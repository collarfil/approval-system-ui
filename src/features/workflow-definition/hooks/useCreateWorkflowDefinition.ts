import { useMutation, useQueryClient } from "@tanstack/react-query";

import { workflowDefinitionService } from "../services/workflowDefinition.service";

export function useCreateWorkflowDefinition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: workflowDefinitionService.create,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["workflow-definitions"],
            });
        },
    });
}