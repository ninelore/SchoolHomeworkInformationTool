import { Component } from '@angular/core';
import { ShitEvent } from 'src/app/models/shit-event';
import { HttpClientService } from 'src/app/service/http-client.service';
import { FakeHttpClientService } from 'src/app/service/fake-http-client.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { EventSubscription } from 'src/app/models/event-subscription';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  onSaveCallback:(newSubs: EventSubscription[], deletedSubs: EventSubscription[], updatedSubs: EventSubscription[]) => void

  private readonly SubcriptionModalId = "subscriptionModal";

  events: ShitEvent[] = [];
  shownEvents: ShitEvent[] = this.events;
  sortMode: string = "date"; // TODO maybe change to enum
  textFilter: string = ""
  subscriptions: EventSubscription[] = [];
  selectedEvent: ShitEvent | null = null;

  public refresh() {
    this.backend.getEvents().subscribe(
      events => this.events = events
    )
    this.backend.getSubscriptions().subscribe(
      subscriptions => this.subscriptions = subscriptions
    )
  }

  constructor(private backend: HttpClientService, private router: Router, private accountService: AccountService) {
    this.refresh();

    this.onSaveCallback = (newSubs: EventSubscription[], deletedSubs: EventSubscription[], updatedSubs: EventSubscription[]) => {
      console.log("onSaveCallback",newSubs, deletedSubs, updatedSubs)
      newSubs.forEach(newSub => {
        this.backend.subscribe(newSub)
      })

      deletedSubs.forEach(deletedSub => {
        this.backend.unsubscribe(deletedSub);
      })

      this.refresh();
    }


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
      this.refresh();
    }

  }

  subscribeFn(event: ShitEvent) {

    // TODO: open subscription form/modal
    return () => {
      this.selectedEvent = event;

      this.refresh();
    }
  }

  hasSubscribed(event: ShitEvent): boolean {
    return this.subscriptions.filter(subscription => event.id === subscription.eventId).length > 0
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
    const event = {
      id: -1,
      name: `Random Event ${Math.round(Math.random() * 1337)}`,
      groupId: 1,
      creatorId: this.accountService.getUser()?.id,
      description: `Random Event ${Math.round(Math.random() * 1337)}`,
      date: new Date(Math.round(Date.now() + Math.random() * 14 * (24 * 60 * 60 * 1000))).toISOString(),
    }
    this.backend.createEvent(event).subscribe(data=>{
      console.log("createEvent",data)
    })

  }
}
