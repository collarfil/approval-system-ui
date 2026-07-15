import { useState, useMemo } from "react";

interface UsePaginationOptions<T> {
    data: T[];
    pageSize?: number;
    initialPage?: number;
}

export function usePagination<T>({
    data,
    pageSize: initialPageSize = 10,
    initialPage = 1,
}: UsePaginationOptions<T>) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return data.slice(start, end);
    }, [data, currentPage, pageSize]);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const changePageSize = (size: number) => {
        setPageSize(size);
        setCurrentPage(1); // Reset to first page when changing page size
    };

    return {
        currentPage,
        pageSize,
        totalPages,
        totalItems,
        paginatedData,
        goToPage,
        changePageSize,
        setCurrentPage,
    };
}