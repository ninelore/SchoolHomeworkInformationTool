import { Component, Input, SimpleChanges } from '@angular/core';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-edit-group-modal',
  templateUrl: './edit-group-modal.component.html',
  styleUrls: ['./edit-group-modal.component.scss']
})
export class EditGroupModalComponent {
  @Input() public onCancel: (group: Group) => void = (group: Group) => { };
  @Input() public onDelete: (group: Group) => void = (group: Group) => { };
  @Input() public onCreate: (group: Group, users: string[]) => void = (group: Group) => { };
  @Input() public onUpdate: (group: Group,addedUsers: string[], deletedUsers: string[]) => void = (group: Group) =>  { };

  @Input() public originalGroup: Group | null = null;
  @Input() public originalUsers: string[] = []

  userNameInput: string;

  editingGroup: Group = this.createDefaultGroup();
  addedUsers: string[] = this.createDefaultUsers();
  deletedUsers: string[] = [];
  constructor() {
    this.editingGroup = this.createDefaultGroup()
  }

  createDefaultUsers(): string[] {
    return []
  }

  finalUserList() {
    return [...this.addedUsers, ...this.originalUsers].filter(user=> this.deletedUsers.indexOf(user) === -1).filter((user, index, self) => self.indexOf(user) === index);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes["originalGroup"]?.currentValue === null || changes["originalUsers"]?.currentValue === null) {
      this.editingGroup = this.createDefaultGroup();
      this.addedUsers = this.createDefaultUsers();
      return;
    }

    // copy 
    if (changes["originalGroup"] && changes["originalGroup"].currentValue !== null) {
      const crr = changes["originalGroup"].currentValue;
      this.editingGroup.id = crr.id;
      this.editingGroup.name = crr.name;
      this.editingGroup.discordGuidId = crr.discordGuidId;
      this.editingGroup.discordNotifyChannelId = crr.discordNotifyChannelId;
      this.addedUsers = this.createDefaultUsers();
      this.deletedUsers = [];
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

  onUserNameChange($event: Event): void {
    this.userNameInput = (<HTMLInputElement>$event.target).value
  }

  onAddUser($event: Event): void {
    console.log("add user")
    if (this.addedUsers.includes(this.userNameInput) || this.userNameInput.trim().length === 0) {
      return;
    }
    this.addedUsers.push(this.userNameInput)
  }

  onRemoveUser(user: string) {
    if (this.deletedUsers.includes(user) || user.trim().length === 0) {
      return;
    }
    this.deletedUsers.push
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


