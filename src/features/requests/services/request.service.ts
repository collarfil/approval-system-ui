import { http } from "@/shared/api/http";

import type {
    Request,
    CreateRequestRequest,
} from "../types/request.types";

export const getRequests =
async (): Promise<Request[]> => {

    const response =
        await http.get<Request[]>("/Request");

    return response.data;
};

export const createRequest =
async (
    data: CreateRequestRequest
): Promise<Request> => {

    const response =
        await http.post<Request>(
            "/Request",
            data
        );

    return response.data;
};

export const getRequest =
async (
    id: string
): Promise<Request> => {

    const response =
        await http.get<Request>(
            `/Request/${id}`
        );

    return response.data;
};