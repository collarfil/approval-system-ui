import { http } from "@/shared/api/http";

import type {
    User,
    CreateUserRequest,
} from "../types/user.types";

export const getUsers = async (): Promise<User[]> => {

    const response = await http.get<User[]>("/User");

    return response.data;
};

export const createUser = async (
    data: CreateUserRequest
): Promise<User> => {

    const response = await http.post<User>(
        "/User",
        data
    );

    return response.data;
};

export const deleteUser = async (
    id: string
): Promise<void> => {

    await http.delete(`/User/${id}`);
};