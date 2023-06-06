import { Component } from '@angular/core';
import { ShitEvent } from 'src/app/models/shit-event';
import { HttpClientService } from 'src/app/service/http-client.service';
import { FakeHttpClientService } from 'src/app/service/fake-http-client.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  public refresh() {
      this.backend.getEvents().subscribe(
        events => this.events = events
      )
  }

  constructor(private backend:FakeHttpClientService ) { 
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
  events: ShitEvent[] = [];
  shownEvents: ShitEvent[] = this.events;
  sortMode: string = "date"; // TODO maybe change to enum
  textFilter: string = ""
}
