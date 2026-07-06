import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createRole } from "../services/role.service";

export const useCreateRole = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createRole,

        onSuccess: () => {

            toast.success("Role created successfully");

            queryClient.invalidateQueries({
                queryKey: ["roles"],
            });

        },

        onError: () => {

            toast.error("Unable to create role");

        },

    });

};