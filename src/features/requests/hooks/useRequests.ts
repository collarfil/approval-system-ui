import { useQuery } from "@tanstack/react-query";

import {
    getRequests,
} from "../services/request.service";

export const useRequests = () => {

    return useQuery({

        queryKey: ["requests"],

        queryFn: getRequests,

    });

};