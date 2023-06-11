import { Observable } from "rxjs";
import { ShitEvent } from "../models/shit-event";
import { EventSubscription } from "../models/event-subscription";
import { Group } from "../models/group";

export interface ShitServerResponse {
    status: string;
    data: Object;
}

export interface HttpClientInterface {
    getEvents(): Observable<ShitEvent[]>;

    createEvent(event:ShitEvent): Observable<ShitServerResponse>

    subscribe(subcription:EventSubscription): Observable<ShitServerResponse>;

    getSubscriptions(): Observable<EventSubscription[]>;

    unsubscribe(subscription:EventSubscription): Observable<ShitServerResponse>;

    // deleteEvent

    // getGroups
    getGroups(): Observable<Group[]>;
    // addGroup
    createGroup(group: Group): Observable<ShitServerResponse>;

    // addUserToGroup

    // getUserInfo

    
}