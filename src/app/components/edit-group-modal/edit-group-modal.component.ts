import { Component, Input, SimpleChanges } from '@angular/core';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-edit-group-modal',
  templateUrl: './edit-group-modal.component.html',
  styleUrls: ['./edit-group-modal.component.scss']
})
export class EditGroupModalComponent {
  @Input() public onCancel: (group:Group) => void = (group:Group) => { };
  @Input() public onDelete: (group:Group) => void = (group:Group) => { };
  @Input() public onCreate: (group:Group) => void = (group:Group) => { };
  @Input() public onUpdate: (group:Group) => void = (group:Group) => { };

  @Input() public originalGroup: Group|null = null;

  editingGroup:Group = this.createDefaultGroup();

  constructor() {
    this.editingGroup = this.createDefaultGroup()
  }


  ngOnChanges(changes: SimpleChanges): void {


    if( changes["originalGroup"]?.currentValue === null){
      this.editingGroup = this.createDefaultGroup();
      return;
    }

    // copy 
    if (changes["originalGroup"] && changes["originalGroup"].currentValue !== null){
      const crr = changes["originalGroup"].currentValue;
      this.editingGroup.id = crr.id;
      this.editingGroup.name = crr.name;
      this.editingGroup.discordGuidId = crr.discordGuidId;
      this.editingGroup.discordNotifyChannelId = crr.discordNotifyChannelId;
    }

  }

  createDefaultGroup(): Group {
    return {
      discordGuidId: 0,
      name: "",
      discordNotifyChannelId: 0,
      id: null,
      ownerUserId: -1
    }
  }


  onGroupNameChange($event: Event): void {
    this.editingGroup.name = (<HTMLInputElement>$event.target).value;
  }

  onGuildIdChange($event: Event): void {
    this.editingGroup.discordGuidId = parseInt((<HTMLInputElement>$event.target).value);
  }

  onNotifyChannelChange($event: Event): void {
    this.editingGroup.discordNotifyChannelId = parseInt((<HTMLInputElement>$event.target).value);
  }

}


