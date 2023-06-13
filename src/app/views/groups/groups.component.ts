import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  public groups: Group[] = []

  selectedGroup: Group | null = null;
  selectedUsers: User[] = [];

  constructor(private backend: HttpClientService) {
    this.refresh();
  }

  refresh() {
    this.backend.getGroups().subscribe(
      groups => this.groups = groups
    )
  }

  onCreateGroupFn() {
    return (group: Group, users: string[],) => {
      this.backend.createGroup(group).subscribe(
        () => this.refresh()
      )
    }
  }

  onUpdateGroupFn() {
    return (group: Group, addedUsers: string[], deletedUsers: string[]) => {

      // group invalid
      if(group.id === null) {
        this.refresh()

        return
      }

      forkJoin([  
        this.backend.updateGroup(group),
        ...addedUsers.map(user => this.backend.addUserToGroupByName({ groupId: group.id as number, id: null, userId: -1 }, user))
      ]).subscribe(
        () => this.refresh()
      )


    }

  }

  onDeleteGroupFn() {
    return (group: Group) => {
      this.backend.deleteGroup(group).subscribe(
        () => this.refresh()
      )
    }
  }

  onAddGroup() {
    this.selectedGroup = null
  }

  onEditFn(group: Group) {
    return () => {
      this.selectedGroup = group
    }
  }

  OnChanges(changes: SimpleChanges): void {
    if (changes["selectedGroup"] && changes["selectedGroup"].currentValue){
      const id = (changes["selectedGroup"].currentValue as Group).id;
      if (id != null) {
        this.backend.getGroupMembers(id).subscribe(users => {
          this.selectedUsers = users;
        });
      }
    }
  }

  ngOnInit(): void {


  }

}
