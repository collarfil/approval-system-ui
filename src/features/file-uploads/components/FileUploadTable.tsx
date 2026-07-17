import { useState } from "react";
import { Plus, Trash2, File, Download } from "lucide-react";
import { useFileUploads, useDeleteFileUpload } from "../hooks/useFileUploads";
import { usePagination } from "@/shared/hooks/usePagination";
import Pagination from "@/shared/components/Pagination";
import CreateFileUploadModal from "./CreateFileUploadModal";

export default function FileUploadTable() {
    const { data = [], isLoading } = useFileUploads();
    const deleteMutation = useDeleteFileUpload();
    const [open, setOpen] = useState(false);

    const {
        currentPage,
        pageSize,
        totalPages,
        totalItems,
        paginatedData,
        goToPage,
        changePageSize,
    } = usePagination({
        data,
        pageSize: 10,
    });

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    };

    const getFileIcon = (contentType: string) => {
        if (contentType.startsWith("image/")) return "🖼️";
        if (contentType === "application/pdf") return "📄";
        if (contentType.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml")) return "📝";
        if (contentType.startsWith("application/vnd.openxmlformats-officedocument.spreadsheetml")) return "📊";
        return <File size={16} />;
    };

    if (isLoading) {
        return <p className="py-8 text-center">Loading files...</p>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">File Uploads</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Upload File
                </button>
            </div>

            <CreateFileUploadModal open={open} onClose={() => setOpen(false)} />

            <div className="overflow-x-auto rounded border">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">File Name</th>
                            <th className="px-4 py-3 text-left">Type</th>
                            <th className="px-4 py-3 text-left">Size</th>
                            <th className="px-4 py-3 text-left">Uploaded By</th>
                            <th className="px-4 py-3 text-left">Uploaded At</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-gray-500">
                                    No files found.
                                </td>
                            </tr>
                        )}

                        {paginatedData.map((file) => (
                            <tr key={file.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{getFileIcon(file.contentType)}</span>
                                        <span className="font-medium">{file.fileName}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="rounded bg-gray-100 px-2 py-1 text-xs font-mono">
                                        {file.contentType}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{formatFileSize(file.fileSize)}</td>
                                <td className="px-4 py-3 font-mono text-sm">{file.uploadedBy}</td>
                                <td className="px-4 py-3 text-sm">
                                    {new Date(file.uploadedAt).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => window.open(file.filePath, "_blank")}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Download"
                                        >
                                            <Download size={18} />
                                        </button>
                                        <button
                                            onClick={() => deleteMutation.mutate(file.id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={goToPage}
                onPageSizeChange={changePageSize}
            />
        </div>
    );
}