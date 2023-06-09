import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShitEvent } from '../models/shit-event';
import { HttpClientInterface, ShitServerResponse } from './http-client.interface';
import { Observable } from 'rxjs';
import { EventSubscription } from '../models/event-subscription';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService implements HttpClientInterface {

  private static readonly basePath = "/rest/shit"
  private static readonly getEventsUrl = HttpClientService.basePath +  "/getEvents"
  private static readonly createEventsUrl = HttpClientService.basePath +  "/createEvent"
  private static readonly getSubscriptionUrl = HttpClientService.basePath + "/getSubscriptions"
  private static readonly createSubscriptionUrl = HttpClientService.basePath + "/createEventSubscription"

  constructor(private http: HttpClient, private accountService: AccountService) { }


  private get<C>(url: string) {
    return this.http.get<C>(url)
  }

  private post<C>(url: string, data: Object) {
    return this.http.post<C>(url, data)
  }

  public subscribe(eventId: number, reminderAmount: number, reminderUnit: string): Observable<ShitServerResponse> {
    const user = this.accountService.getUser();

    if (!user) {
      return new Observable<ShitServerResponse>((observer) => {
        observer.next({
          status: "error",
          data: {
            message: "User not logged in"
          }
        });
      });
    }

    return this.post(HttpClientService.createSubscriptionUrl, {
      userId: user,
      eventId: eventId,
      reminderAmount: reminderAmount,
      reminderUnit: reminderUnit
    })

  }

  public getEvents() {

    const user = this.accountService.getUser();
    if(!user) {
      alert("User not logged in");
      return new Observable<ShitEvent[]>((observer) => {
        observer.next([]);
      });
    }

    return this.get<ShitEvent[]>(HttpClientService.getEventsUrl + `/${user}`);
  }

  public createEvent(name: string, description: string, date: Date, groupId: number): Observable<ShitServerResponse> {

    const user = this.accountService.getUser();

    if (!user) {
      return new Observable<ShitServerResponse>((observer) => {
        observer.next({
          status: "error",
          data: {
            message: "User not logged in"
          }
        });
      });
    }

    const event: ShitEvent = {
      id: -1,
      creatorId: user.id,
      name,
      date,
      description,
      groupId
    }

    return this.post<ShitServerResponse>(HttpClientService.createEventsUrl, event);
  }

  public getSubscriptions(): Observable<EventSubscription[]> {

    const user = this.accountService.getUser();

    if (!user) {
      return new Observable<EventSubscription[]>((observer) => {
        observer.next([]);
      });
    }

    return this.get<EventSubscription[]>(HttpClientService.getSubscriptionUrl + `/${user}`);
  }

}

