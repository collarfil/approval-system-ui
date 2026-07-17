import AuditLogTable from "../components/AuditLogTable";

export default function AuditLogPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Audit Logs</h1>
                <p className="mt-1 text-gray-500">
                    Track all system activities and changes across the platform.
                </p>
            </div>
            <AuditLogTable />
        </div>
    );
}