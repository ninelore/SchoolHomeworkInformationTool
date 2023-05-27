import { Component } from '@angular/core';
import { ShitEvent } from 'src/app/models/shit-event';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  search(event: Event) {
    const value = (event.target as HTMLInputElement).value ?? "";

    this.textFilter = value;
    this.updateShownEvents();

  }

  updateShownEvents() {
    const filtred = this.events.sort((a, b) => {
      if (this.sortMode === "date") {
        return (a.date ?? new Date("1970-01-01")) > (b.date ?? new Date("1970-01-01")) ? 1 : 0
      }

      if (this.sortMode === "dateR") {
        return (a.date ?? new Date("1970-01-01")) <= (b.date ?? new Date("1970-01-01")) ? 1 : 0
      }
      if( this.sortMode === "name"){
        return (a.name ?? "").localeCompare(b.name ?? "")
      }
      if( this.sortMode === "nameR"){
        return (b.name ?? "").localeCompare(a.name ?? "")
      }
      return 0
    }).filter(event => JSON.stringify(event).toLowerCase().includes(this.textFilter.toLowerCase()));

    // only update on change
    if (filtred != this.shownEvents) {
      this.shownEvents = filtred
    }
  }

  changeSortMode(event: Event) {
    const value = (event.target as HTMLSelectElement).value ?? "date";

    this.sortMode = value;
    this.updateShownEvents()

  }
  events: ShitEvent[] = [
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
  shownEvents: ShitEvent[] = this.events;
  sortMode: string = "date"; // TODO maybe change to enum
  textFilter: string = ""
}
