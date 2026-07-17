import { http } from "@/shared/api/http";
import type { AuditLog } from "../types/auditLog.types";

export const getAuditLogs = async (): Promise<AuditLog[]> => {
    const response = await http.get<AuditLog[]>("/AuditLog");
    return response.data;
};

export const getAuditLogById = async (id: string): Promise<AuditLog> => {
    const response = await http.get<AuditLog>(`/AuditLog/${id}`);
    return response.data;
};