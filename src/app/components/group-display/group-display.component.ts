import { Component, Input } from '@angular/core';
import { Group } from 'src/app/models/group';

@Component({
  selector: '[group-row]',
  templateUrl: './group-display.component.html',
  styleUrls: ['./group-display.component.scss']
})
export class GroupDisplayComponent {
  @Input() public group?: Group;
}
