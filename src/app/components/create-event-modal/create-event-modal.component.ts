import { Component, Input } from '@angular/core';
import { ShitEvent } from 'src/app/models/shit-event';

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.scss']
})
export class CreateEventModalComponent {

  @Input() public event?: ShitEvent;

  save(){}

  cancel(){}
}
