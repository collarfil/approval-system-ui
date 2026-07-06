import { http } from "@/shared/api/http";

import type {
    LoginRequest,
    AuthResponse,
} from "../types/auth.types";

export const login = async (
    data: LoginRequest
): Promise<AuthResponse> => {

    const response = await http.post<AuthResponse>(
        "/Auth/login",
        data
    );

    return response.data;
};