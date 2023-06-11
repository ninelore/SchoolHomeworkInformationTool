import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShitEvent } from 'src/app/models/shit-event';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {

  @Input() event: ShitEvent;

  @Input() onEventDelete:(event:ShitEvent)=>void;
  @Input() updateCallback:(event:ShitEvent)=>void;

  constructor(private backend: HttpClientService) {
  }

  updateName($event: Event) {
    const tartget = $event.target as HTMLInputElement;
    this.event.name = tartget.value;
  }

  updateDate($event: Event) {
    const tartget = $event.target as HTMLInputElement;

    this.event.date = tartget.valueAsDate?.toISOString();
  }

  updateDescription($event: Event) {
    const tartget = $event.target as HTMLTextAreaElement;

    this.event.description = tartget.value;

  }

  updateGroup($event: Event) {
    const tartget = $event.target as HTMLInputElement;

    this.event.groupId = parseInt(tartget.value);

  }

  updateEventType($event: Event) {
    const tartget = $event.target as HTMLSelectElement;

    this.event.eventType = tartget.value as "HOMEWORK" | "EXAM" | null;
  }

  updateReminderAmount($event: Event) {
    const tartget = $event.target as HTMLInputElement;

    this.event.reminderAmount = parseInt(tartget.value);
  }

  updateReminderUnit($event: Event) {
    const tartget = $event.target as HTMLSelectElement;

    this.event.reminderUnit = tartget.value as "WEEK" | "HOUR" | "DAY";
  }

}
