import { Component, Input, SimpleChanges } from '@angular/core';
import { ShitEvent } from 'src/app/models/shit-event';

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.scss']
})
export class CreateEventModalComponent {

  @Input() public originalEvent: ShitEvent | null;
  @Input() public onEventCreate: (event:ShitEvent)=>void;
  @Input() public onEventUpdate: (event:ShitEvent)=>void;
  @Input() public onEventDelete: (event:ShitEvent)=>void;

  editedEvent: ShitEvent;

  constructor(){
    this.editedEvent = this.editedEvent = {
      id: 0,
      name: "",
      description: "",
      date: new Date().toISOString(),
      eventType: null,
      reminderAmount: 1,
      reminderUnit: "DAY"
    }
  }

  ngOnChanges(changes: SimpleChanges): void {


    if( changes["originalEvent"]?.currentValue === null){
      this.editedEvent = {
        id: 0,
        name: "",
        description: "",
        date: new Date().toISOString(),
        eventType: null,
        reminderAmount: 1,
        reminderUnit: "DAY"
      }
      return
    }

    if (changes["originalEvent"].currentValue !== null && this.editedEvent !== null){
      const crr = changes["originalEvent"].currentValue
      this.editedEvent.id = crr.id
      this.editedEvent.name = crr.name
      this.editedEvent.description = crr.description
      this.editedEvent.date = crr.date
      this.editedEvent.eventType = crr.eventType
      this.editedEvent.reminderAmount = crr.reminderAmount
      this.editedEvent.reminderUnit = crr.reminderUnit
      this.editedEvent.creatorId = crr.creatorId
      this.editedEvent.groupId = crr.groupId

    }

  }

  deleteFn():(event:ShitEvent)=>void{
    return (event:ShitEvent)=>{
      this.onEventDelete(event);
    }
  }

  save() { 
    
    if (this.originalEvent === null){
      this.onEventCreate(this.editedEvent!);
    }
    else{
      this.onEventUpdate(this.editedEvent!);
    }

  }

  cancel() {

    this.editedEvent  = {
      id: 0,
      name: "",
      description: "",
      date: new Date().toISOString(),
      eventType: null,
      reminderAmount: 1,
      reminderUnit: "DAY"
    };

   }
}
