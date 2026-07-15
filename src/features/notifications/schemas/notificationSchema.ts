import { z } from "zod";

export const notificationSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    title: z.string().min(2, "Title must be at least 2 characters"),
    message: z.string().min(5, "Message must be at least 5 characters"),
});

export type NotificationFormData = z.infer<typeof notificationSchema>;