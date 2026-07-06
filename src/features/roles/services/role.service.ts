import { http } from "@/shared/api/http";

import type {
    Role,
    CreateRoleRequest,
} from "../types/role.types";

export const getRoles = async (): Promise<Role[]> => {
    const response = await http.get<Role[]>("/Role");

    return response.data;
};

export const createRole = async (
    data: CreateRoleRequest
): Promise<Role> => {
    const response = await http.post<Role>(
        "/Role",
        data
    );

    return response.data;
};

export const deleteRole = async (
    id: string
) => {
    await http.delete(`/Role/${id}`);
};