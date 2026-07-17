export interface AuditLog {
    id: string;
    entityName: string;
    entityId: string;
    action: string;
    oldValue: string;
    newValue: string;
    performedById: string;
    performedByName?: string; // Add this for display
    timestamp: string;
}