import { Component, Input } from '@angular/core';
import { ShitEvent } from 'src/app/models/shit-event';

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.scss']
})
export class EventDisplayComponent {
  @Input() public event?: ShitEvent;
  @Input() public created: boolean = false;
  @Input() public subscribed: boolean = false;
}
