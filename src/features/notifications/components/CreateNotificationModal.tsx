import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notificationSchema, type NotificationFormData } from "../schemas/notificationSchema";
import { useCreateNotification } from "../hooks/useNotifications";
import { X } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateNotificationModal({ open, onClose }: Props) {
    const mutation = useCreateNotification();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NotificationFormData>({
        resolver: zodResolver(notificationSchema),
    });

    if (!open) return null;

    const onSubmit = (data: NotificationFormData) => {
        mutation.mutate(data, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Create Notification</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            {...register("userId")}
                            placeholder="User ID"
                            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="mt-1 text-sm text-red-500">{errors.userId?.message}</p>
                    </div>

                    <div>
                        <input
                            {...register("title")}
                            placeholder="Title"
                            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="mt-1 text-sm text-red-500">{errors.title?.message}</p>
                    </div>

                    <div>
                        <textarea
                            {...register("message")}
                            placeholder="Message"
                            rows={4}
                            className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="mt-1 text-sm text-red-500">{errors.message?.message}</p>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded border px-4 py-2 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {mutation.isPending ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}