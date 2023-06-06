import { Component } from '@angular/core';
import { ShitEvent } from 'src/app/models/shit-event';
import { HttpClientService } from 'src/app/service/http-client.service';
import { FakeHttpClientService } from 'src/app/service/fake-http-client.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { EventSubscription } from 'src/app/models/event-subscription';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  editSubscriptionFn(event: ShitEvent) {
    // TODO: open subscription form/modal
    return ()=>{
      this.refresh();
    }

  }

  subscribeFn(event: ShitEvent) {

    // TODO: open subscription form/modal

    return ()=>{
      this.backend.subscribe(event.id ?? -1, 1, "day");
      this.refresh();
    }
  }

  hasSubscribed(event: ShitEvent): boolean {
    return this.subscriptions.filter(subscription => event.id === subscription.eventId).length > 0
  }

  events: ShitEvent[] = [];
  shownEvents: ShitEvent[] = this.events;
  sortMode: string = "date"; // TODO maybe change to enum
  textFilter: string = ""
  subscriptions: EventSubscription[] = [];

  public refresh() {
    this.backend.getEvents().subscribe(
      events => this.events = events
    )
    this.backend.getSubscriptions().subscribe(
      subscriptions => this.subscriptions = subscriptions
    )
  }

  constructor(private backend: FakeHttpClientService, private router: Router, private accountService: AccountService) {
    this.refresh();
  }

  public search(event: Event) {
    const value = (event.target as HTMLInputElement).value ?? "";

    this.textFilter = value;
    this.updateShownEvents();

  }

  public updateShownEvents() {
    const filtred = this.events.sort((a, b) => {
      if (this.sortMode === "date") {
        return (a.date ?? new Date("1970-01-01")) > (b.date ?? new Date("1970-01-01")) ? 1 : 0
      }

      if (this.sortMode === "dateR") {
        return (a.date ?? new Date("1970-01-01")) <= (b.date ?? new Date("1970-01-01")) ? 1 : 0
      }
      if (this.sortMode === "name") {
        return (a.name ?? "").localeCompare(b.name ?? "")
      }
      if (this.sortMode === "nameR") {
        return (b.name ?? "").localeCompare(a.name ?? "")
      }
      return 0
    }).filter(event => JSON.stringify(event).toLowerCase().includes(this.textFilter.toLowerCase()));

    // only update on change
    if (filtred != this.shownEvents) {
      this.shownEvents = filtred
    }
  }

  public changeSortMode(event: Event) {
    const value = (event.target as HTMLSelectElement).value ?? "date";

    this.sortMode = value;
    this.updateShownEvents()

  }



  getUser() {
    // TODO: Enable read function
    // return this.accountService.getUser();

    return 1337;
  }
  create() {
    // TODO: enable real function
    // this.router.navigate(['/form'], { queryParams: { mode: 'create' }});

    // TMP code
    this.backend.createEvent(
      `Random Event ${Math.round(Math.random() * 1337)}`,
      "Random Event", new Date(Math.round(Date.now() + Math.random() * 14 * (24 * 60 * 60 * 1000))),
      0
    )

  }
}
