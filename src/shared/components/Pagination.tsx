import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    pageSizeOptions?: number[];
}

export default function Pagination({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [5, 10, 20, 50, 100],
}: PaginationProps) {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            
            if (currentPage > 3) {
                pages.push("...");
            }
            
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            if (currentPage < totalPages - 2) {
                pages.push("...");
            }
            
            pages.push(totalPages);
        }
        
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
            {/* Items info */}
            <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{startItem}</span> to{" "}
                <span className="font-medium">{endItem}</span> of{" "}
                <span className="font-medium">{totalItems}</span> results
            </div>

            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                {/* Page size selector */}
                {onPageSizeChange && (
                    <select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {pageSizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size} per page
                            </option>
                        ))}
                    </select>
                )}

                {/* Navigation buttons */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded border ${
                        currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "hover:bg-gray-50 text-gray-600"
                    }`}
                >
                    <ChevronLeft size={16} />
                </button>

                {getPageNumbers().map((page, index) =>
                    typeof page === "number" ? (
                        <button
                            key={index}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 rounded text-sm ${
                                currentPage === page
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-50 text-gray-600"
                            }`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="px-1 text-gray-400">
                            {page}
                        </span>
                    )
                )}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded border ${
                        currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "hover:bg-gray-50 text-gray-600"
                    }`}
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}