import { z } from "zod";

export const userSchema = z.object({

    firstName: z
        .string()
        .min(2, "First name is required"),

    lastName: z
        .string()
        .min(2, "Last name is required"),

    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    departmentId: z
        .string()
        .min(1, "Department is required"),

});

export type UserFormData =
    z.infer<typeof userSchema>;