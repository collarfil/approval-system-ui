import axios from "axios";
import { env } from "@/shared/config/env";

import {
    getToken,
    removeToken,
} from "@/shared/utils/token";

export const http = axios.create({
    baseURL: env.apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

http.interceptors.request.use((config) => {

    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

http.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            removeToken();

            localStorage.removeItem("expiresAt");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);