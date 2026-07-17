import { useState } from "react";
import { Plus } from "lucide-react";
import { useRequests } from "../hooks/useRequests";
import { usePagination } from "@/shared/hooks/usePagination";
import Pagination from "@/shared/components/Pagination";
import CreateRequestModal from "./CreateRequestModal";
import RequestStatusBadge from "./RequestStatusBadge";

export default function RequestTable() {
    const [open, setOpen] = useState(false);
    const { data = [], isLoading, isError } = useRequests();

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

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load requests.</p>;

    return (
        <>
            <div className="rounded-lg bg-white shadow">
                <div className="flex items-center justify-between border-b p-6">
                    <h2 className="text-2xl font-semibold">Requests</h2>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        New Request
                    </button>
                </div>

                {paginatedData.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">No requests found.</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left">Title</th>
                                <th className="px-6 py-3 text-left">Amount</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((r) => (
                                <tr key={r.id} className="border-t">
                                    <td className="px-6 py-4">{r.title}</td>
                                    <td className="px-6 py-4">₦{r.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <RequestStatusBadge status={r.status} />
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(r.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={goToPage}
                onPageSizeChange={changePageSize}
            />

            <CreateRequestModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}