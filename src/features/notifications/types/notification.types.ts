export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export interface CreateNotificationRequest {
    userId: string;
    title: string;
    message: string;
}