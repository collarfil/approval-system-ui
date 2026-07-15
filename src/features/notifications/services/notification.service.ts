import { http } from "@/shared/api/http";
import type { Notification, CreateNotificationRequest } from "../types/notification.types";

export const getNotifications = async (): Promise<Notification[]> => {
    const response = await http.get<Notification[]>("/Notification");
    return response.data;
};

export const getNotificationsByUser = async (userId: string): Promise<Notification[]> => {
    const response = await http.get<Notification[]>(`/Notification/user/${userId}`);
    return response.data;
};

export const getUnreadNotifications = async (userId: string): Promise<Notification[]> => {
    const response = await http.get<Notification[]>(`/Notification/user/${userId}/unread`);
    return response.data;
};

export const getUnreadCount = async (userId: string): Promise<number> => {
    const response = await http.get<number>(`/Notification/user/${userId}/count`);
    return response.data;
};

export const createNotification = async (data: CreateNotificationRequest): Promise<Notification> => {
    const response = await http.post<Notification>("/Notification", data);
    return response.data;
};

export const markAsRead = async (id: string): Promise<void> => {
    await http.patch(`/Notification/${id}/read`);
};

export const deleteNotification = async (id: string): Promise<void> => {
    await http.delete(`/Notification/${id}`);
};