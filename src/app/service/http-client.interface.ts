import { Observable } from "rxjs";
import { ShitEvent } from "../models/shit-event";
import { EventSubscription } from "../models/event-subscription";

export interface ShitServerResponse {
    status: string;
    data: Object;
}

export interface HttpClientInterface {
    getEvents(): Observable<ShitEvent[]>;

    createEvent(name: string, description: string, date: Date, groupId: number): Observable<ShitServerResponse>

    subscribe(eventId: number, reminderAmount: number, reminderUnit: string): Observable<ShitServerResponse>;

    getSubscriptions(): Observable<EventSubscription[]>;
}