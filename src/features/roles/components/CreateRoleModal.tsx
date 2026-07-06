import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    roleSchema,
    type RoleFormData,
} from "../schemas/roleSchema";

import { useCreateRole } from "../hooks/useCreateRole";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateRoleModal({
    open,
    onClose,
}: Props) {

    const createRole = useCreateRole();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RoleFormData>({
        resolver: zodResolver(roleSchema),
    });

    useEffect(() => {

        if (!open) {
            reset();
        }

    }, [open, reset]);

    const onSubmit = (data: RoleFormData) => {

        createRole.mutate(data, {

            onSuccess: () => {

                reset();

                onClose();

            },

        });

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">

                <div className="border-b px-6 py-4">

                    <h2 className="text-xl font-semibold">
                        Create Role
                    </h2>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 p-6"
                >

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Role Name
                        </label>

                        <input
                            {...register("name")}
                            className="w-full rounded border px-3 py-2"
                        />

                        <p className="text-sm text-red-600">
                            {errors.name?.message}
                        </p>

                    </div>

                    <div>

                        <label className="mb-1 block text-sm font-medium">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            {...register("description")}
                            className="w-full rounded border px-3 py-2"
                        />

                        <p className="text-sm text-red-600">
                            {errors.description?.message}
                        </p>

                    </div>

                    <div className="flex justify-end gap-3 border-t pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded border px-4 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={createRole.isPending}
                            className="rounded bg-blue-600 px-4 py-2 text-white"
                        >
                            {createRole.isPending
                                ? "Creating..."
                                : "Create Role"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}