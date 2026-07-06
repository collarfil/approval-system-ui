import { useQuery } from "@tanstack/react-query";
import { getWorkflows } from "../services/workflow.service";

export const useWorkflows = () => {

    return useQuery({
        queryKey: ["workflows"],
        queryFn: getWorkflows,
    });

};