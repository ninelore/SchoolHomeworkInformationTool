import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Group } from 'src/app/models/group';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  public groups: Group[] = []

  selectedGroup: Group | null = null;
  selectedUsers: string[] = [];

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



  ngOnInit(): void {


  }

}
