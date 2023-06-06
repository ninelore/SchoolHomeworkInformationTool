import { Observable } from "rxjs";
import { ShitEvent } from "../models/shit-event";

export interface HttpClientInterface  {
    getEvents(): Observable<ShitEvent[]>;

    subscribe(userId:string, eventId:string): Observable<any>;

}