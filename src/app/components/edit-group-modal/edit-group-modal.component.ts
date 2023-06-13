import { Component, Input, SimpleChanges } from '@angular/core';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-group-modal',
  templateUrl: './edit-group-modal.component.html',
  styleUrls: ['./edit-group-modal.component.scss']
})
export class EditGroupModalComponent {
  @Input() public onCancel: (group: Group) => void = (group: Group) => { };
  @Input() public onDelete: (group: Group) => void = (group: Group) => { };
  @Input() public onCreate: (group: Group, users: string[]) => void = (group: Group) => { };
  @Input() public onUpdate: (group: Group, addedUsers: string[], deletedUsers: User[]) => void = (group: Group) => { };

  @Input() public originalGroup: Group | null = null;
  @Input() public originalUsers: User[] = []

  userNameInput: string;

  editingGroup: Group = this.createDefaultGroup();
  addedUsers: string[] = this.createDefaultUsers();
  deletedUsers: User[] = [];
  constructor() {
    this.editingGroup = this.createDefaultGroup()
  }

  createDefaultUsers(): string[] {
    return []
  }

  finalUserList() {
    const deletedUserIds = this.deletedUsers.map(user => user.id)
    const added = this.addedUsers.map<User>(userName => (
      {
        id: null,
        discordId: 0,
        email: "",
        name: userName,
        token: ""
      } as User)
    )
    const unfiltered = [...added, ...this.originalUsers]
    const filtered = unfiltered.filter(user => deletedUserIds.indexOf(user.id) === -1);
    return filtered.map(user => user.name)
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
      this.editingGroup.discordGuildId = crr.discordGuildId;
      this.editingGroup.discordNotifyChannelId = crr.discordNotifyChannelId;
      this.addedUsers = this.createDefaultUsers();
      this.deletedUsers = [];
    }


  }

  createDefaultGroup(): Group {
    return {
      discordGuildId: 0,
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

  onRemoveUser(userName: string) {
    if (this.deletedUsers.map(user => user.name).includes(userName) || userName.trim().length === 0) {
      return;
    }
    const userE = this.originalUsers.find(user => user.name === userName);
    if (userE)
      this.deletedUsers.push(userE)
  }

  onGroupNameChange($event: Event): void {
    this.editingGroup.name = (<HTMLInputElement>$event.target).value;
  }

  onGuildIdChange($event: Event): void {
    this.editingGroup.discordGuildId = parseInt((<HTMLInputElement>$event.target).value);
  }

  onNotifyChannelChange($event: Event): void {
    this.editingGroup.discordNotifyChannelId = parseInt((<HTMLInputElement>$event.target).value);
  }

}


