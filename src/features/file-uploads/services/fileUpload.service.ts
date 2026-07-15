import { http } from "@/shared/api/http";
import type { FileUpload, CreateFileUploadRequest } from "../types/fileUpload.types";

export const getFileUploads = async (): Promise<FileUpload[]> => {
    const response = await http.get<FileUpload[]>("/FileUpload");
    return response.data;
};

export const getFileUploadById = async (id: string): Promise<FileUpload> => {
    const response = await http.get<FileUpload>(`/FileUpload/${id}`);
    return response.data;
};

export const createFileUpload = async (data: CreateFileUploadRequest): Promise<FileUpload> => {
    const response = await http.post<FileUpload>("/FileUpload", data);
    return response.data;
};

export const deleteFileUpload = async (id: string): Promise<void> => {
    await http.delete(`/FileUpload/${id}`);
};