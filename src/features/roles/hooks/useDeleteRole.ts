import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteRole } from "../services/role.service";

export const useDeleteRole = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteRole,

        onSuccess: () => {

            toast.success("Role deleted");

            queryClient.invalidateQueries({
                queryKey: ["roles"],
            });

        },

        onError: () => {

            toast.error("Unable to delete role");

        },

    });

};