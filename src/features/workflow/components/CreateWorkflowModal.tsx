import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    workflowSchema,
    type WorkflowFormData,
} from "../schemas/workflowSchema";

import { useCreateWorkflow } from "../hooks/useCreateWorkflow";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateWorkflowModal({
    open,
    onClose,
}: Props) {

    const mutation = useCreateWorkflow();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<WorkflowFormData>({
        resolver: zodResolver(workflowSchema),
    });

    if (!open) return null;

    const onSubmit = (data: WorkflowFormData) => {

        mutation.mutate(data, {

            onSuccess: () => {

                reset();

                onClose();

            },

        });

    };

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-lg rounded bg-white p-6">

                <h2 className="mb-6 text-xl font-bold">

                    Create Workflow

                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <div>

                        <input
                            {...register("name")}
                            placeholder="Workflow Name"
                            className="w-full rounded border p-2"
                        />

                        <p className="text-sm text-red-500">
                            {errors.name?.message}
                        </p>

                    </div>

                    <div>

                        <textarea
                            {...register("description")}
                            placeholder="Description"
                            rows={4}
                            className="w-full rounded border p-2"
                        />

                        <p className="text-sm text-red-500">
                            {errors.description?.message}
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
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}