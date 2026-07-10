import ApprovalTable from "../components/ApprovalTable";

export default function ApprovalPage() {
    const approverId = localStorage.getItem("userId") ?? "";

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Workflow Approvals Ledger
                </h1>
                <p className="text-gray-500 mt-1 text-sm">
                    Review, escalate, or clear pipeline objects requiring your digital validation key.
                </p>
            </div>

            <ApprovalTable approverId={approverId} />
        </div>
    );
}