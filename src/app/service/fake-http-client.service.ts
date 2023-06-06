import { Injectable } from '@angular/core';
import { HttpClientInterface } from './http-client.interface';
import { Observable } from 'rxjs';
import { ShitEvent } from '../models/shit-event';
import { EventSubscription } from '../models/event-subscription';

@Injectable({
  providedIn: 'root'
})
export class FakeHttpClientService implements HttpClientInterface{
  private fakeUSerId = 1337;

  private events:ShitEvent[] =  [
    {
      id: 0,
      name: "Event 1",
      description: "Description 1",
      date: new Date("2023-05-30")
    },
    {
      id: 1,
      name: "Event 2",
      description: "Description 2",
      date: new Date("2023-06-27")
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

  public subscribe(eventId: string, reminderAmount: number, reminderUnit: string): Observable<any> {
    const user = this.fakeUSerId;
    this.subscrtions.push({
      id: -1,
      eventId: Number.parseInt(eventId),
      userId: user,
      reminderAmount: reminderAmount,
      reminderUnit: reminderUnit
    })
    
    return new Observable<any>(
      (observer) => {
        observer.next({
          status: "success"
        });
      });
  }

  createEvent(event:ShitEvent): Observable<any> {
    this.events.push(event);
    return new Observable<any>(
      (observer) => {
        observer.next({
          status: "success"
        });
      }
    )
  }


  getSubscribtions(): Observable<EventSubscription[]> {
   
    return new Observable<EventSubscription[]>((observer) => {
      observer.next(
       this.subscrtions
      );
    })

  }

}