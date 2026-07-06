import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteUser } from "../services/user.service";

export const useDeleteUser = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteUser,

        onSuccess: () => {

            toast.success("User deleted");

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

        },

        onError: () => {

            toast.error("Failed to delete user");

        },

    });

};