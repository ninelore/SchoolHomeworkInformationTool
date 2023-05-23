import { Component } from '@angular/core';
import { ShitEvent } from 'src/app/models/shit-event';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  events: ShitEvent[] = [
    {
      id: 0,
      name: "Event 1",
      description: "Description 1",
    },
    {
      id: 1,
      name: "Event 2",
      description: "Description 2",
    }
  ]
}
