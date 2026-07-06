import { z } from "zod";

export const workflowDefinitionSchema = z.object({
    name: z
        .string()
        .min(2, "Workflow name is required"),

    description: z
        .string()
        .min(2, "Description is required"),
});

export type WorkflowDefinitionFormData =
    z.infer<typeof workflowDefinitionSchema>;