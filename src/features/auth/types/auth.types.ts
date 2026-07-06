export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    id: string;
    email: string;
    token: string;
    expiresAt: string;
}

export interface AuthUser {
    id: string;
    email: string;
}