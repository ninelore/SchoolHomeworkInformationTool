export interface EventSubscription {
    id: number;
    userId: number;
    eventId: number;
    reminder: string; // TODO: Refactor to Duration
}
