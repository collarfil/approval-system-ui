import { z } from "zod";

export const requestSchema = z.object({

    title: z
        .string()
        .min(2, "Title is required"),

    description: z
        .string()
        .min(2, "Description is required"),

    amount: z
        .number({
            error: "Amount is required",
        })
        .positive(),

    workflowDefinitionId: z
        .string()
        .min(1, "Workflow is required"),
});

export type RequestFormData =
    z.infer<typeof requestSchema>;