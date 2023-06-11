import { Component } from '@angular/core';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
  public groups: Group[] = [{
    discordGuidId: 0,
    discordNotifyChannelId: 0,
    id: 0,
    name: 'Group 0',
    ownerUserId: 0

  }]
}
