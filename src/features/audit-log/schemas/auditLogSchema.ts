import { z } from "zod";

export const auditLogSchema = z.object({
    entityName: z.string().min(1, "Entity name is required"),
    entityId: z.string().min(1, "Entity ID is required"),
    action: z.string().min(1, "Action is required"),
    oldValue: z.string().optional().default(""),
    newValue: z.string().optional().default(""),
    performedById: z.string().min(1, "Performed by is required"),
});

export type AuditLogFormData = z.infer<typeof auditLogSchema>;