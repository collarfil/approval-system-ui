export interface CurrentUser {
    id: string;
    fullName: string;
    email: string;
    role: string;
    department: string;
    permissions: string[];
}