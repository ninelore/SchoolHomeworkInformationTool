import { Injectable } from '@angular/core';
import { HttpClientInterface, ShitServerResponse } from './http-client.interface';
import { Observable } from 'rxjs';
import { ShitEvent } from '../models/shit-event';
import { EventSubscription } from '../models/event-subscription';
import { Group } from '../models/group';
import { GroupMembership } from '../models/group-membership';

@Injectable({
  providedIn: 'root'
})
export class FakeHttpClientService implements HttpClientInterface {
  deleteEvent(event: ShitEvent): Observable<ShitServerResponse> {
    throw new Error('Method not implemented.');
  }
  updateEvent(event: ShitEvent): Observable<ShitServerResponse> {
    throw new Error('Method not implemented.');
  }
  deleteGroup(group: Group): Observable<ShitServerResponse> {
    throw new Error('Method not implemented.');
  }
  addUserToGroup(group: GroupMembership): Observable<ShitServerResponse> {
    throw new Error('Method not implemented.');
  }
  getGroups(): Observable<Group[]> {
    throw new Error('Method not implemented.');
  }
  createGroup(group: Group): Observable<ShitServerResponse> {
    throw new Error('Method not implemented.');
  }

  private fakeUSerId = 1337;
  private eventCounter = 0;
  private subscriptionCounter = 0;
  private events: ShitEvent[] = [
    {
      id: 0,
      name: "Event 1",
      description: "Description 1",
      date: new Date("2023-05-30").toISOString(),
      reminderAmount: 1,
      reminderUnit: "DAY",
      creatorId: this.fakeUSerId,
      groupId: 0,
      eventType: null
    },
    {
      id: 1,
      name: "Event 2",
      description: "Description 2",
      date: new Date("2023-06-27").toISOString(),
      reminderAmount: 1,
      reminderUnit: "DAY",
      creatorId: this.fakeUSerId,
      groupId: 0,
      eventType: null
    }
  ]

  private subscrtions: EventSubscription[] = [

  ]

  getEvents(): Observable<ShitEvent[]> {
    return new Observable<ShitEvent[]>((observer) => {
      observer.next(
        this.events
      );
    })
  }

  public subscribe(subscription: EventSubscription): Observable<any> {
    const user = this.fakeUSerId;
    subscription.id = this.subscriptionCounter++;
    this.subscrtions.push(subscription)

    console.log("subscribing: ", subscription)
    return new Observable<any>(
      (observer) => {
        observer.next({
          status: "success"
        });
      });
  }

  createEvent(event: ShitEvent): Observable<any> {
    event.id = this.eventCounter++;
    console.log("creating event: ", event)
    return new Observable<any>(
      (observer) => {
        observer.next({
          status: "success"
        });
      }
    )
  }


  getSubscriptions(): Observable<EventSubscription[]> {

    return new Observable<EventSubscription[]>((observer) => {
      observer.next(
        this.subscrtions
      );
    })

  }
  
  unsubscribe(subscription: EventSubscription): Observable<ShitServerResponse> {
    this.subscrtions = this.subscrtions.filter(
      (s) => s.id !== subscription.id
    )
    console.log("unsubscribing: ", subscription)
    return new Observable<ShitServerResponse>((observer) => {
      observer.next({
        status: "success",
        data: {}
      });
    })

  }
}