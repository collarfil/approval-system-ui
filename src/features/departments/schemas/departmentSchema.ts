import { z } from "zod";

export const departmentSchema = z.object({
    name: z
        .string()
        .min(2, "Department name is required"),

    description: z
        .string()
        .min(2, "Description is required"),
});

export type DepartmentFormData =
    z.infer<typeof departmentSchema>;