import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
    createRequest,
} from "../services/request.service";

export const useCreateRequest = () => {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: createRequest,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["requests"],

            });

            toast.success(
                "Request submitted successfully"
            );
        },

        onError: () => {

            toast.error(
                "Unable to submit request"
            );
        },

    });

};