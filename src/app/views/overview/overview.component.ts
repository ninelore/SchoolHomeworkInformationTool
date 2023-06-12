import { Component } from '@angular/core';
import { ShitEvent } from 'src/app/models/shit-event';
import { HttpClientService } from 'src/app/service/http-client.service';
import { FakeHttpClientService } from 'src/app/service/fake-http-client.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { EventSubscription } from 'src/app/models/event-subscription';
import { bootstrapApplication } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  subscriptionSaveCallback: (newSubs: EventSubscription[], deletedSubs: EventSubscription[], updatedSubs: EventSubscription[]) => void

  eventSaveCallback: (event:ShitEvent) => void
  eventUpdateCallback: (event:ShitEvent) => void
  eventDeleteCallback: (event:ShitEvent) => void

  private readonly SubcriptionModalId = "subscriptionModal";

  events: ShitEvent[] = [];
  shownEvents: ShitEvent[] = this.events;
  sortMode: string = "date"; // TODO maybe change to enum
  textFilter: string = ""
  subscriptions: EventSubscription[] = [];
  selectedEvent: ShitEvent | null = null;
  selectedSubscriptions: EventSubscription[] = [];

  constructor(private backend: FakeHttpClientService, private router: Router, private accountService: AccountService) {
    this.refresh();

    this.subscriptionSaveCallback = (newSubs: EventSubscription[], deletedSubs: EventSubscription[], updatedSubs: EventSubscription[]) => {
      console.log("onSaveCallback", newSubs, deletedSubs, updatedSubs)

      forkJoin([
        ...newSubs.map(newSub => this.backend.subscribe(newSub)),
        ...deletedSubs.map(deletedSub => this.backend.unsubscribe(deletedSub))
      ]).subscribe(
        ([newSubs, deletedSubs]) => {
          console.log("onSaveCallback", newSubs, deletedSubs)
          this.refresh();
        }
      )
    }
  


    this.eventSaveCallback = (event:ShitEvent) => {
      this.backend.createEvent(event).subscribe(
        () => this.refresh()
      )
    }

    this.eventUpdateCallback = (event:ShitEvent) => {
      // this.backend.updateEvent(event).subscribe(
      //   () => this.refresh()
      // )
      console.log("onUpdateCallback", event)
      this.backend.updateEvent(event).subscribe(
        () => this.refresh()
      )
    }

    this.eventDeleteCallback = (event:ShitEvent) => {
      console.log("onDeleteCallback", event)
      this.backend.deleteEvent(event).subscribe(
        () => this.refresh()
      )
    }
  }

  public refresh() {
    forkJoin([this.backend.getEvents(), this.backend.getSubscriptions()]).subscribe(
      ([events, subscriptions]) => {
        this.events = events;
        this.subscriptions = subscriptions
        this.selectedSubscriptions = this.subscriptions.filter(sub => (this.selectedEvent !== null && sub.eventId === this.selectedEvent.id))
        this.updateShownEvents();
      }
    )
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

  editSubscriptionFn(event: ShitEvent) {
    // TODO: open subscription form/modal

    return () => {
      this.selectedEvent = event;
      this.selectedSubscriptions = this.subscriptions.filter(subscription => subscription.eventId === event.id);

      this.refresh();
    }

  }

  editEventFn(event: ShitEvent) {
    return () => {
      this.selectedEvent = event;

    }
  }

  subscribeFn(event: ShitEvent) {

    // TODO: open subscription form/modal
    return () => {
      this.selectedEvent = event;
      this.selectedSubscriptions = this.subscriptions.filter(subscription => subscription.eventId === event.id);

      this.refresh();
    }
  }

  hasSubscribed(event: ShitEvent): boolean {
    return this.subscriptions.filter(subscription => event.id === subscription.eventId).length > 0
  }

  getUser() {
    // TODO: Enable read function
    // return this.accountService.getUser();

    return this.accountService.getUser()?.id;
  }
  create() {
    // TODO: enable real function
    // this.router.navigate(['/form'], { queryParams: { mode: 'create' }});
    this.selectedEvent = null;
    return
    // TMP code
    const rnd = Math.round(Math.random() * 1337);
    const event = {
      id: null,
      name: `Random Event ${rnd}`,
      groupId: 1,
      creatorId: this.accountService.getUser()?.id ?? undefined,
      description: `Random Event ${rnd}`,
      date: new Date(Math.round(Date.now() + Math.random() * 14 * (24 * 60 * 60 * 1000))).toISOString(),
      reminderAmount: 1,
      reminderUnit: "DAY" as "WEEK" | "HOUR" | "DAY",
      eventType: null
    }
    this.backend.createEvent(event).subscribe(data => {
      console.log("createEvent", data)
    })

  }
}
