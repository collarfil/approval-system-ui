import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    requestSchema,
    type RequestFormData,
} from "../schemas/requestSchema";

import { useCreateRequest } from "../hooks/useCreateRequest";

// change to your workflow hook
import { useWorkflows } from "@/features/workflow/hooks/useWorkflows";

interface Props {

    open: boolean;

    onClose: () => void;

}

export default function CreateRequestModal({

    open,

    onClose,

}: Props) {

    const createRequest =
        useCreateRequest();

    const { data: workflows } =
        useWorkflows();

    const {

        register,

        handleSubmit,

        reset,

        formState: { errors },

    } = useForm<RequestFormData>({

        resolver:
            zodResolver(requestSchema),

    });

    useEffect(() => {

        if (!open) {

            reset();

        }

    }, [open, reset]);

    const onSubmit = (
        data: RequestFormData
    ) => {

        createRequest.mutate(data, {

            onSuccess: () => {

                reset();

                onClose();

            },

        });

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-xl rounded-lg bg-white shadow-xl">

                <div className="border-b p-6">

                    <h2 className="text-xl font-semibold">

                        Create Request

                    </h2>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 p-6"
                >

                    <div>

                        <label>Title</label>

                        <input
                            {...register("title")}
                            className="w-full rounded border px-3 py-2"
                        />

                        <p className="text-red-600 text-sm">

                            {errors.title?.message}

                        </p>

                    </div>

                    <div>

                        <label>Description</label>

                        <textarea
                            rows={4}
                            {...register("description")}
                            className="w-full rounded border px-3 py-2"
                        />

                    </div>

                    <div>

                        <label>Amount</label>

                        <input
                            type="number"
                            step="0.01"
                            {...register("amount", {
                                valueAsNumber: true,
                            })}
                            className="w-full rounded border px-3 py-2"
                        />

                    </div>

                    <div>

                        <label>Workflow</label>

                        <select
                            {...register(
                                "workflowDefinitionId"
                            )}
                            className="w-full rounded border px-3 py-2"
                        >

                            <option value="">
                                Select Workflow
                            </option>

                            {workflows?.map(w => (

                                <option
                                    key={w.id}
                                    value={w.id}
                                >
                                    {w.name}
                                </option>

                            ))}

                        </select>

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
                            className="rounded bg-blue-600 px-4 py-2 text-white"
                        >
                            Submit Request
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}