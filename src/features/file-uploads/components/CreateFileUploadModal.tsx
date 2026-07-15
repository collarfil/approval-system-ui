import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileUploadSchema, type FileUploadFormData } from "../schemas/fileUploadSchema";
import { useCreateFileUpload } from "../hooks/useFileUploads";
import { X, Upload, File } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateFileUploadModal({ open, onClose }: Props) {
    const mutation = useCreateFileUpload();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<FileUploadFormData>({
        resolver: zodResolver(fileUploadSchema),
        defaultValues: {
            fileSize: 0,
            contentType: "",
            fileName: "",
            storedFileName: "",
            filePath: "",
            uploadedBy: "",
        },
    });

    if (!open) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setValue("fileName", file.name);
            setValue("storedFileName", `${Date.now()}-${file.name}`);
            setValue("contentType", file.type);
            setValue("fileSize", file.size);
            setValue("filePath", `/uploads/${Date.now()}-${file.name}`);
        }
    };

    const onSubmit = (data: FileUploadFormData) => {
        mutation.mutate(data, {
            onSuccess: () => {
                reset();
                setSelectedFile(null);
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Upload File</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* File Drop Zone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select File
                        </label>
                        <div
                            className={`relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg transition-colors ${
                                selectedFile
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                            }`}
                        >
                            {selectedFile ? (
                                <div className="flex items-center gap-3">
                                    <File className="text-green-600" size={32} />
                                    <div>
                                        <p className="font-medium text-gray-900">{selectedFile.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {(selectedFile.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setValue("fileName", "");
                                            setValue("storedFileName", "");
                                            setValue("contentType", "");
                                            setValue("fileSize", 0);
                                            setValue("filePath", "");
                                        }}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Upload className="text-gray-400 mb-2" size={32} />
                                    <p className="text-sm text-gray-600">
                                        Drag & drop or click to browse
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Supports: Images, PDF, Word, Excel
                                    </p>
                                </>
                            )}
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.svg"
                            />
                        </div>
                        <p className="mt-1 text-sm text-red-500">{errors.fileName?.message}</p>
                    </div>

                    {/* Hidden fields - auto-filled from file selection */}
                    <input type="hidden" {...register("storedFileName")} />
                    <input type="hidden" {...register("filePath")} />
                    <input type="hidden" {...register("contentType")} />
                    <input type="hidden" {...register("fileSize", { valueAsNumber: true })} />

                    <div>
                        <input
                            {...register("uploadedBy")}
                            placeholder="Uploaded By (User ID)"
                            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="mt-1 text-sm text-red-500">{errors.uploadedBy?.message}</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded border px-4 py-2 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending || !selectedFile}
                            className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            <Upload size={18} />
                            {mutation.isPending ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}