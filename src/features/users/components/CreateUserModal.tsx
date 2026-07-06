import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    userSchema,
    type UserFormData,
} from "../schemas/userSchema";

import { useCreateUser } from "../hooks/useCreateUser";
import { useDepartments } from "@/features/departments/hooks/useDepartments";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateUserModal({
    open,
    onClose,
}: Props) {

    const mutation = useCreateUser();

    const { data: departments } = useDepartments();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    });

    if (!open) return null;

    const onSubmit = (data: UserFormData) => {

        mutation.mutate(data, {

            onSuccess: () => {

                reset();

                onClose();

            },

        });

    };

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg">

                <h2 className="mb-6 text-xl font-bold">

                    Create User

                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <div>

                        <input
                            {...register("firstName")}
                            placeholder="First Name"
                            className="w-full rounded border p-2"
                        />

                        <p className="text-sm text-red-500">
                            {errors.firstName?.message}
                        </p>

                    </div>

                    <div>

                        <input
                            {...register("lastName")}
                            placeholder="Last Name"
                            className="w-full rounded border p-2"
                        />

                        <p className="text-sm text-red-500">
                            {errors.lastName?.message}
                        </p>

                    </div>

                    <div>

                        <input
                            {...register("email")}
                            placeholder="Email"
                            className="w-full rounded border p-2"
                        />

                        <p className="text-sm text-red-500">
                            {errors.email?.message}
                        </p>

                    </div>

                    <div>

                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Password"
                            className="w-full rounded border p-2"
                        />

                        <p className="text-sm text-red-500">
                            {errors.password?.message}
                        </p>

                    </div>

                    <div>

                        <select
                            {...register("departmentId")}
                            className="w-full rounded border p-2"
                            defaultValue=""
                        >

                            <option value="">
                                Select Department
                            </option>

                            {departments?.map((department) => (

                                <option
                                    key={department.id}
                                    value={department.id}
                                >
                                    {department.name}
                                </option>

                            ))}

                        </select>

                        <p className="text-sm text-red-500">
                            {errors.departmentId?.message}
                        </p>

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded border px-4 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {mutation.isPending
                                ? "Saving..."
                                : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}