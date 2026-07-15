export interface FileUpload {
    id: string;
    fileName: string;
    storedFileName: string;
    filePath: string;
    contentType: string;
    fileSize: number;
    uploadedBy: string;
    uploadedAt: string;
}

export interface CreateFileUploadRequest {
    fileName: string;
    storedFileName: string;
    filePath: string;
    contentType: string;
    fileSize: number;
    uploadedBy: string;
}