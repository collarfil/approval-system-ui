import FileUploadTable from "../components/FileUploadTable";

export default function FileUploadPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">File Uploads</h1>
                <p className="mt-1 text-gray-500">Manage uploaded files.</p>
            </div>
            <FileUploadTable />
        </div>
    );
}