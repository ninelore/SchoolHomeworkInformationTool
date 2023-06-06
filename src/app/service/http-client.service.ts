import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShitEvent } from '../models/shit-event';
import { HttpClientInterface } from './http-client.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService implements HttpClientInterface {
  private static readonly eventsUrl = "api/events"
  constructor(private http: HttpClient) { }
 
  private get<C>(url: string) {
    return this.http.get<C>(url)
  }

  subscribe(userId: string, eventId: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  public getEvents() {
    return this.get<ShitEvent[]>(HttpClientService.eventsUrl);
  }

}

