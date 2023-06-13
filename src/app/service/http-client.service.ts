import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShitEvent } from '../models/shit-event';
import { HttpClientInterface, ShitServerResponse } from './http-client.interface';
import { Observable } from 'rxjs';
import { EventSubscription } from '../models/event-subscription';
import { AccountService } from './account.service';
import { environment } from '../../environments/environment';
import { Group } from '../models/group';
import { GroupMembership } from '../models/group-membership';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService implements HttpClientInterface {

  private static readonly basePath = environment.serviceUrl + "/rest/shit"

  private static readonly getEventUrl = HttpClientService.basePath + "/getEvents"
  private static readonly createEventUrl = HttpClientService.basePath + "/createEvent"
  private static readonly deleteEventUrl = HttpClientService.basePath + "/deleteEvent"
  private static readonly updateEventUrl = HttpClientService.basePath + "/editEvent"

  private static readonly getSubscriptionUrl = HttpClientService.basePath + "/getEventSubscriptions"
  private static readonly createSubscriptionUrl = HttpClientService.basePath + "/createEventSubscription"
  private static readonly deleteSubscriptionUrl = HttpClientService.basePath + "/deleteEventSubscription"

  private static readonly getGroupsUrl = HttpClientService.basePath + "/getGroups"
  private static readonly getGroupMembersUrl = HttpClientService.basePath + "/getGroupMembers"
  private static readonly createGroupUrl = HttpClientService.basePath + "/createGroup"
  private static readonly deleteGroupUrl = HttpClientService.basePath + "/deleteGroup"
  private static readonly updateGroupUrl = HttpClientService.basePath + "/editGroup"


  private static readonly addUserToGroupUrl = HttpClientService.basePath + "/createGroupMembership"
  private static readonly addUserToGroupByNameUrl = HttpClientService.basePath + "/createGroupMembershipByName"

  private static readonly removeUserFromGroupUrl = HttpClientService.basePath + "/deleteGroupMembership"


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
      return new Observable<ShitEvent[]>((observer) => {
        observer.error(["User not logged in"]);
        observer.complete();
      });
    }

    return this.get<ShitEvent[]>(HttpClientService.getEventUrl + `/${user.id}`);
  }

  getGroupMembers(grouId: number): Observable<User[]> {

    return this.get(HttpClientService.getGroupMembersUrl + `/${grouId}`)

  }

  public createEvent(event: ShitEvent): Observable<ShitServerResponse> {

    const user = this.accountService.getUser();

    if (!user || user.id === null) {
      return new Observable<ShitServerResponse>((observer) => {
        observer.next({
          status: "error",
          data: {
            message: "User not logged in"
          }
        });
      });
    }

    if(!isEventValid(event)){
      return new Observable<ShitServerResponse>((observer) => {
        observer.next({
          status: "error",
          data: {
            message: "Invalid event"
          }
        });
      })
    }

    event.creatorId = user.id;
    return this.post<ShitServerResponse>(HttpClientService.createEventUrl, event);
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


    const user = this.accountService.getUser();
    if (!user) {
      return new Observable<Group[]>((observer) => {
        observer.error(["User not logged in"]);
        observer.complete();
      });
    }

    return this.get(HttpClientService.getGroupsUrl + `/${user.id}`);
  }
  createGroup(group: Group): Observable<ShitServerResponse> {

    const user = this.accountService.getUser();

    if (!user || user.id === null) {
      return new Observable<ShitServerResponse>((observer) => {
        observer.next({
          status: "error",
          data: {
            message: "User not logged in"
          }
        });
      });
    }
    group.ownerUserId = user.id;

    return this.post(HttpClientService.createGroupUrl, group);
  }
  deleteEvent(event: ShitEvent): Observable<ShitServerResponse> {
    return this.delete(HttpClientService.deleteEventUrl + `/${event.id}`);
  }
  updateEvent(event: ShitEvent): Observable<ShitServerResponse> {

    if(!isEventValid(event)){
      return new Observable<ShitServerResponse>((observer) => {
        observer.next({
          status: "error",
          data: {
            message: "Invalid event"
          }
        });
      })
    }

    return this.post(HttpClientService.updateEventUrl, event);
  }
  deleteGroup(group: Group): Observable<ShitServerResponse> {
    return this.delete(HttpClientService.deleteGroupUrl + `/${group.id}`);
  }
  addUserToGroup(gm: GroupMembership): Observable<ShitServerResponse> {
    return this.post(HttpClientService.addUserToGroupUrl, gm);
  }

  updateGroup(group: Group): Observable<ShitServerResponse> {
    const user = this.accountService.getUser();

    if (!user || user.id === null) {
      return new Observable<ShitServerResponse>((observer) => {
        observer.next({
          status: "error",
          data: {
            message: "User not logged in"
          }
        });
      });
    }
    group.ownerUserId = user.id;
    return this.post(HttpClientService.updateGroupUrl, group);
  }

  addUserToGroupByName(gm: GroupMembership,name: string): Observable<ShitServerResponse> {
    return this.post(HttpClientService.addUserToGroupByNameUrl + `/${name}`, gm);
  }
}

function isEventValid(event: ShitEvent):boolean {

  return !event.date

}

