import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { 
    getNotifications, 
    getNotificationsByUser,
    getUnreadNotifications,
    getUnreadCount,
    createNotification,
    markAsRead,
    deleteNotification 
} from "../services/notification.service";

export const useNotifications = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
    });
};

export const useNotificationsByUser = (userId: string) => {
    return useQuery({
        queryKey: ["notifications", "user", userId],
        queryFn: () => getNotificationsByUser(userId),
        enabled: !!userId,
    });
};

export const useUnreadNotifications = (userId: string) => {
    return useQuery({
        queryKey: ["notifications", "unread", userId],
        queryFn: () => getUnreadNotifications(userId),
        enabled: !!userId,
        refetchInterval: 30000, // Refresh every 30 seconds
    });
};

export const useUnreadCount = (userId: string) => {
    return useQuery({
        queryKey: ["notifications", "count", userId],
        queryFn: () => getUnreadCount(userId),
        enabled: !!userId,
        refetchInterval: 30000,
    });
};

export const useCreateNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNotification,
        onSuccess: () => {
            toast.success("Notification created successfully");
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: () => {
            toast.error("Failed to create notification");
        },
    });
};

export const useMarkAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: () => {
            toast.error("Failed to mark notification as read");
        },
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNotification,
        onSuccess: () => {
            toast.success("Notification deleted");
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
        onError: () => {
            toast.error("Failed to delete notification");
        },
    });
};