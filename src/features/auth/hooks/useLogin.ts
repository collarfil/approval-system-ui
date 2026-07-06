import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/hooks";
import toast from "react-hot-toast";

import { login } from "../services/auth.service";
import { loginSuccess } from "../store/authSlice";

export const useLogin = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,

        onSuccess: (data) => {

            dispatch(loginSuccess(data));

            toast.success("Login successful");

            navigate("/dashboard");
        },

        onError: () => {

            toast.error("Invalid email or password");
        },
    });
};