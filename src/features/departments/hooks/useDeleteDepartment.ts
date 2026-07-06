import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { deleteDepartment } from "../services/department.service";

export const useDeleteDepartment = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteDepartment,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });

            toast.success("Department deactivated");
        },

        onError: () => {

            toast.error("Unable to deactivate department");
        },
    });
};