import { useQuery } from "@tanstack/react-query";
import { getAuditLogs, getAuditLogById } from "../services/auditLog.service";
import { getUsers } from "@/features/users/services/user.service";

export const useAuditLogs = () => {
    return useQuery({
        queryKey: ["auditLogs"],
        queryFn: async () => {
            // Fetch both audit logs and users in parallel
            const [logs, users] = await Promise.all([
                getAuditLogs(),
                getUsers(),
            ]);

            // Create a map of user ID to user name
            const userMap = new Map<string, string>();
            users.forEach((user) => {
                userMap.set(user.id, `${user.firstName} ${user.lastName}`);
            });

            // Add performedByName to each log
            return logs.map((log) => ({
                ...log,
                performedByName: userMap.get(log.performedById) || log.performedById,
            }));
        },
    });
};

export const useAuditLogById = (id: string) => {
    return useQuery({
        queryKey: ["auditLogs", id],
        queryFn: async () => {
            const log = await getAuditLogById(id);
            if (!log) return null;
            
            // Fetch user for this specific log
            const users = await getUsers();
            const userMap = new Map<string, string>();
            users.forEach((user) => {
                userMap.set(user.id, `${user.firstName} ${user.lastName}`);
            });
            
            return {
                ...log,
                performedByName: userMap.get(log.performedById) || log.performedById,
            };
        },
        enabled: !!id,
    });
};