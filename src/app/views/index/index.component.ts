import { Component } from '@angular/core';
import { ShitEvent } from 'src/app/models/shit-event';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/service/account.service';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  constructor(
    private accountService: AccountService,
    private backend: HttpClientService,
  ) {

    this.refresh();

  }

  events: ShitEvent[] = [];
  shownEvents: ShitEvent[] = [];
  numPostShown: number = 5;
  refresh() {
    this.backend.getEvents().subscribe(
      events => {
        this.events = events;
        this.filterEvents();
      }
    )
  }

  filterEvents() {
    const sorted = this.events.sort((a, b) => {
      return (a.date ?? new Date("1970-01-01")) > (b.date ?? new Date("1970-01-01")) ? 1 : 0
    }).filter((e, i, a) => i < this.numPostShown);
    const filterted = sorted.filter((e, i, a) => i < this.numPostShown);
    this.shownEvents = filterted
  }

  getName(): string {
    let user = this.accountService.getUser();
    if (user != null) {
      return user.name;
    } else {
      return "";
    }
  }
}
