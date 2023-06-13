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
    return (group: Group, addedUsers: string[], deletedUsers: User[]) => {

      // group invalid
      if (group.id === null) {
        this.refresh()

        return
      }

      forkJoin([
        this.backend.updateGroup(group),
        ...addedUsers.map(user => this.backend.addUserToGroupByName({ groupId: group.id as number, id: null, userId: -1 }, user)),
        this.backend.deleteGroupMembers(group, deletedUsers)
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
    this.selectGroup(null);

  }

  selectGroup(group: Group | null) {
    this.selectedGroup = group

    const id = group?.id ?? null;
    if (id != null) {
      this.backend.getGroupMembers(id).subscribe(users => {
        this.selectedUsers = users ?? [];
      });
    }

  }

  onEditFn(group: Group) {
    return () => {
      this.selectGroup(group);
    }
  }



  ngOnInit(): void {


  }

}
