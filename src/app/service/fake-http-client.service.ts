import { Injectable } from '@angular/core';
import { HttpClientInterface } from './http-client.interface';
import { Observable } from 'rxjs';
import { ShitEvent } from '../models/shit-event';

@Injectable({
  providedIn: 'root'
})
export class FakeHttpClientService implements HttpClientInterface{

  getEvents(): Observable<ShitEvent[]> {
    return new Observable<ShitEvent[]>((observer) => {
      observer.next(
        [
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
      );
    })
  }
  subscribe(userId: string, eventId: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
