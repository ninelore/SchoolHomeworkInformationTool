import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShitEvent } from '../models/shit-event';
import { HttpClientInterface, ShitServerResponse } from './http-client.interface';
import { Observable } from 'rxjs';
import { EventSubscription } from '../models/event-subscription';
import { AccountService } from './account.service';
import { environment } from '../../environments/environment';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService implements HttpClientInterface {

  private static readonly basePath = environment.serviceUrl + "/rest/shit"
  private static readonly getEventsUrl = HttpClientService.basePath + "/getEvents"
  private static readonly createEventsUrl = HttpClientService.basePath + "/createEvent"
  private static readonly getSubscriptionUrl = HttpClientService.basePath + "/getEventSubscriptions"
  private static readonly createSubscriptionUrl = HttpClientService.basePath + "/createEventSubscription"
  private static readonly deleteSubscriptionUrl = HttpClientService.basePath + "/deleteEventSubscriptions"
  private static readonly getGroupsUrl = HttpClientService.basePath + "/getGroups"
  private static readonly createGroupUrl = HttpClientService.basePath + "/createGroup"


  constructor(private http: HttpClient, private accountService: AccountService) { }


  private get<C>(url: string) {
    return this.http.get<C>(url)
  }

  private post<C>(url: string, data: Object) {
    return this.http.post<C>(url, data)
  }

  private delete<C>(url: string) {
    return this.http.delete<C>(url)
  }

  public subscribe(subscription: EventSubscription): Observable<ShitServerResponse> {
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

    return this.post(HttpClientService.createSubscriptionUrl, subscription);

  }

  public getEvents() {

    const user = this.accountService.getUser();
    if (!user) {
      alert("User not logged in");
      return new Observable<ShitEvent[]>((observer) => {
        observer.next([]);
      });
    }

    return this.get<ShitEvent[]>(HttpClientService.getEventsUrl + `/${user.id}`);
  }

  public createEvent(event: ShitEvent): Observable<ShitServerResponse> {

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

    return this.post<ShitServerResponse>(HttpClientService.createEventsUrl, event);
  }

  public getSubscriptions(): Observable<EventSubscription[]> {

    const user = this.accountService.getUser();

    if (!user) {
      return new Observable<EventSubscription[]>((observer) => {
        observer.next([]);
      });
    }

    return this.get<EventSubscription[]>(HttpClientService.getSubscriptionUrl + `/${user.id}`);
  }

  unsubscribe(subscription: EventSubscription): Observable<ShitServerResponse> {
    return this.delete<ShitServerResponse>(HttpClientService.deleteSubscriptionUrl + `/${subscription.id}`);
  }

  getGroups(): Observable<Group[]> {
    return this.get(HttpClientService.getGroupsUrl);
  }
  createGroup(group: Group): Observable<ShitServerResponse> {
    return this.post(HttpClientService.createGroupUrl, group);
  }

}

