import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getFileUploads, createFileUpload, deleteFileUpload } from "../services/fileUpload.service";

export const useFileUploads = () => {
    return useQuery({
        queryKey: ["fileUploads"],
        queryFn: getFileUploads,
    });
};

export const useCreateFileUpload = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFileUpload,
        onSuccess: () => {
            toast.success("File uploaded successfully");
            queryClient.invalidateQueries({ queryKey: ["fileUploads"] });
        },
        onError: () => {
            toast.error("Failed to upload file");
        },
    });
};

export const useDeleteFileUpload = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFileUpload,
        onSuccess: () => {
            toast.success("File deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["fileUploads"] });
        },
        onError: () => {
            toast.error("Failed to delete file");
        },
    });
};