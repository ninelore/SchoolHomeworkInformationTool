export interface EventSubscription {
    id: number | null;
    userId: number;
    eventId: number;
    reminderAmount: number;
    reminderUnit: "WEEK"|"HOUR"|"DAY";
}
