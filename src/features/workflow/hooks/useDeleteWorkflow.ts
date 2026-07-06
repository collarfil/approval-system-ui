import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteWorkflow } from "../services/workflow.service";

export const useDeleteWorkflow = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteWorkflow,

        onSuccess: () => {

            toast.success("Workflow deleted");

            queryClient.invalidateQueries({
                queryKey: ["workflows"],
            });

        },

    });

};