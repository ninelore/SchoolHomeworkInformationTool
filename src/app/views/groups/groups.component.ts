import { Component, OnInit } from '@angular/core';
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

  constructor(private backend: HttpClientService) {
    this.refresh();
  }

  refresh() {
    this.backend.getGroups().subscribe(
      groups => this.groups = groups
    )
  }

  onCreateGroupFn() {
    return (group: Group) => {
      this.backend.createGroup(group).subscribe(
        () => this.refresh()
      )
    }
  }

  onUpdateGroupFn() {
    return (group: Group) => {
      this.backend.updateGroup(group).subscribe(
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
