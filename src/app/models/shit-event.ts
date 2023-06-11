export interface ShitEvent {
    id?: number | null;
    eventType: "HOMEWORK"|"EXAM"|null;
    name?: string;
    groupId?: number;
    creatorId?: number;
    description?: string;
    date?: string;
    reminderAmount: number;
    reminderUnit: "WEEK"|"HOUR"|"DAY";
}
