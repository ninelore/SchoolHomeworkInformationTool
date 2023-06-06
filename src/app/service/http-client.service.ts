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

  private static readonly eventsUrl = "rest/events"
  private static readonly subscriptionUrl = "rest/subscriptions"

  constructor(private http: HttpClient, private accountService: AccountService) { }


  private get<C>(url: string) {
    return this.http.get<C>(url)
  }

  private post<C>(url: string, data: Object) {
    return this.http.post<C>(url, data)
  }

  public subscribe(eventId: string, reminderAmount: number, reminderUnit: string): Observable<ShitServerResponse> {
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

    return this.post(HttpClientService.subscriptionUrl, {
      userId: user,
      eventId: eventId,
      reminderAmount: reminderAmount,
      reminderUnit: reminderUnit
    })

  }

  public getEvents() {
    return this.get<ShitEvent[]>(HttpClientService.eventsUrl);
  }

  public createEvent(event: ShitEvent): Observable<ShitServerResponse> {
    return this.post<ShitServerResponse>(HttpClientService.eventsUrl, event);
  }

  public getSubscribtions(): Observable<EventSubscription[]> {
    return this.get<EventSubscription[]>(HttpClientService.subscriptionUrl);
  }

}

