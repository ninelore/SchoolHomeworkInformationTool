export interface EventSubscription {
    id: number;
    userId: number;
    eventId: number;
    reminderAmount: number;
    reminderUnit: "WEEK"|"HOUR"|"DAY";
}
