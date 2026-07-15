import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/user.service";
import { getDepartments } from "@/features/departments/services/department.service";

export const useUsersWithDepartments = () => {
    return useQuery({
        queryKey: ["users", "withDepartments"],
        queryFn: async () => {
            // Fetch both users and departments in parallel
            const [users, departments] = await Promise.all([
                getUsers(),
                getDepartments(),
            ]);

            // Create a map of department ID to department name
            const departmentMap = new Map<string, string>();
            departments.forEach((dept) => {
                departmentMap.set(dept.id, dept.name);
            });

            // Add department name to each user
            return users.map((user) => ({
                ...user,
                departmentName: departmentMap.get(user.departmentId) || user.departmentId,
            }));
        },
    });
};