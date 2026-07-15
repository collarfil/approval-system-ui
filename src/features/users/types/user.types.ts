export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    departmentId: string;
    departmentName?: string; // Add this for display
}

export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    departmentId: string;
}