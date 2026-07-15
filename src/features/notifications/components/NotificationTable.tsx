import { useState } from "react";
import { Plus, Trash2, CheckCircle, Bell } from "lucide-react";
import { useNotifications, useDeleteNotification, useMarkAsRead } from "../hooks/useNotifications";
import CreateNotificationModal from "./CreateNotificationModal";

export default function NotificationTable() {
    const { data, isLoading } = useNotifications();
    const deleteMutation = useDeleteNotification();
    const markAsReadMutation = useMarkAsRead();
    const [open, setOpen] = useState(false);

    if (isLoading) {
        return <p className="py-8 text-center">Loading notifications...</p>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Notifications</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <Plus size={18} />
                    New Notification
                </button>
            </div>

            <CreateNotificationModal open={open} onClose={() => setOpen(false)} />

            <div className="overflow-x-auto rounded border">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">Title</th>
                            <th className="px-4 py-3 text-left">Message</th>
                            <th className="px-4 py-3 text-left">User</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Created At</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-gray-500">
                                    No notifications found.
                                </td>
                            </tr>
                        )}

                        {data?.map((notification) => (
                            <tr key={notification.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{notification.title}</td>
                                <td className="px-4 py-3">{notification.message}</td>
                                <td className="px-4 py-3 font-mono text-sm">{notification.userId}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold ${
                                            notification.isRead
                                                ? "bg-gray-100 text-gray-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}
                                    >
                                        <Bell size={12} />
                                        {notification.isRead ? "Read" : "Unread"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {new Date(notification.createdAt).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {!notification.isRead && (
                                            <button
                                                onClick={() => markAsReadMutation.mutate(notification.id)}
                                                className="text-green-600 hover:text-green-800"
                                                title="Mark as read"
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteMutation.mutate(notification.id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}