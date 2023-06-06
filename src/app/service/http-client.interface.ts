import { Observable } from "rxjs";
import { ShitEvent } from "../models/shit-event";
import { EventSubscription } from "../models/event-subscription";

 export interface ShitServerResponse {
     status: string;
     data: Object;
 }

export interface HttpClientInterface  {
    getEvents(): Observable<ShitEvent[]>;

    createEvent(event:ShitEvent): Observable<ShitServerResponse>

    subscribe(eventId:string, reminderAmount:number, reminderUnit: string): Observable<ShitServerResponse>;

    getSubscribtions(): Observable<EventSubscription[]>;
}