import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { createDepartment } from "../services/department.service";

export const useCreateDepartment = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createDepartment,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["departments"],
            });

            toast.success("Department created successfully");
        },

        onError: () => {

            toast.error("Unable to create department");
        },
    });
};