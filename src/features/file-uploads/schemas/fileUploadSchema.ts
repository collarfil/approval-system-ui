import { z } from "zod";

export const fileUploadSchema = z.object({
    fileName: z.string().min(2, "File name is required"),
    storedFileName: z.string().min(2, "Stored file name is required"),
    filePath: z.string().min(2, "File path is required"),
    contentType: z.string().min(1, "Content type is required"),
    fileSize: z.number().positive("File size must be positive"),
    uploadedBy: z.string().min(1, "Uploaded by is required"),
});

export type FileUploadFormData = z.infer<typeof fileUploadSchema>;