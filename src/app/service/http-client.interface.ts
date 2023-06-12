import { Observable } from "rxjs";
import { ShitEvent } from "../models/shit-event";
import { EventSubscription } from "../models/event-subscription";
import { Group } from "../models/group";
import { GroupMembership } from "../models/group-membership";

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

    deleteEvent(event:ShitEvent): Observable<ShitServerResponse>;
    updateEvent(event:ShitEvent): Observable<ShitServerResponse>;

    getGroups(): Observable<Group[]>;
    createGroup(group: Group): Observable<ShitServerResponse>;
    deleteGroup(group: Group): Observable<ShitServerResponse>;
    updateGroup(group: Group): Observable<ShitServerResponse>;
    addUserToGroupByName(gm: GroupMembership,name: string):  Observable<ShitServerResponse>;
    // addUserToGroup
    addUserToGroup(group: GroupMembership): Observable<ShitServerResponse>;


    // getUserInfo
}