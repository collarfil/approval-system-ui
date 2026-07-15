import { useState } from "react";
import { Bell } from "lucide-react";
import { useUnreadNotifications, useUnreadCount, useMarkAsRead } from "../hooks/useNotifications";

interface Props {
    userId: string;
}

export default function NotificationBell({ userId }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { data: unreadCount = 0 } = useUnreadCount(userId);
    const { data: notifications = [] } = useUnreadNotifications(userId);
    const markAsRead = useMarkAsRead();

    const handleMarkAsRead = (id: string) => {
        markAsRead.mutate(id);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-200">
                        <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500 text-sm">
                                No unread notifications
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                                        !notification.isRead ? "bg-blue-50" : ""
                                    }`}
                                    onClick={() => handleMarkAsRead(notification.id)}
                                >
                                    <div className="font-medium text-sm">{notification.title}</div>
                                    <div className="text-sm text-gray-600">{notification.message}</div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}