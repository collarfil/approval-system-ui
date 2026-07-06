import { http } from "@/shared/api/http";

import type {
    Department,
    CreateDepartmentRequest,
} from "../types/department.types";

export const getDepartments = async (): Promise<Department[]> => {

    const response =
        await http.get<Department[]>("/Department");

    return response.data;
};

export const createDepartment = async (
    data: CreateDepartmentRequest
): Promise<Department> => {

    const response =
        await http.post<Department>(
            "/Department",
            data
        );

    return response.data;
};

export const deleteDepartment = async (
    id: string
): Promise<void> => {

    await http.delete(`/Department/${id}`);
};