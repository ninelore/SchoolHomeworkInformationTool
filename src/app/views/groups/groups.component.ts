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

  constructor(private backend: HttpClientService){
    this.refresh();
  }

  refresh(){
    this.backend.getGroups().subscribe(
      groups => this.groups = groups
    )
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
