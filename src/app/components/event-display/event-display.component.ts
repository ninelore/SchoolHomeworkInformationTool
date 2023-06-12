import { Component, Input } from '@angular/core';
import { Group } from 'src/app/models/group';
import { ShitEvent } from 'src/app/models/shit-event';

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.scss']
})
export class EventDisplayComponent {
  parseDate(arg0: string | undefined): string | undefined {
    if (arg0 === undefined) {
      return;
    }
    return new Date(arg0).toISOString()
  }
  @Input() public event?: ShitEvent;
  @Input() public created: boolean = false;
  @Input() public subscribed: boolean = false;
  @Input() public subscribe: () => void = () => { };
  @Input() public editSubscription: () => void = () => { };
  @Input() public edit: (event: ShitEvent | null | undefined) => void = () => { };
  @Input() public group: Group| null = null;
}
