import { z } from "zod";

export const approvalFormSchema = z.object({
    action: z.enum(["approve", "reject", "escalate"]),
    comment: z.string().trim().min(1, "Comment or reason field cannot be empty"),
});

export type ApprovalFormData = z.infer<typeof approvalFormSchema>;