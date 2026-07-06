import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUser } from "../services/user.service";

export const useCreateUser = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createUser,

        onSuccess: () => {

            toast.success("User created successfully");

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

        },

        onError: () => {

            toast.error("Failed to create user");

        },

    });

};