export interface Role {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
}

export interface CreateRoleRequest {
    name: string;
    description: string;
}