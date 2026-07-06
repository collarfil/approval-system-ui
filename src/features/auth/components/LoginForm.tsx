import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginSchema,
    type LoginFormData,
} from "../schemas/loginSchema";

import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {

    const loginMutation = useLogin();

    const {

        register,

        handleSubmit,

        formState: { errors },

    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {

        loginMutation.mutate(data);

    };

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >

            <div>

                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full rounded border p-3"
                />

                <p className="text-red-500 text-sm">

                    {errors.email?.message}

                </p>

            </div>

            <div>

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="w-full rounded border p-3"
                />

                <p className="text-red-500 text-sm">

                    {errors.password?.message}

                </p>

            </div>

            <button
                disabled={loginMutation.isPending}
                className="w-full rounded bg-blue-600 p-3 text-white"
            >
                {loginMutation.isPending
                    ? "Logging in..."
                    : "Login"}
            </button>

        </form>

    );
}