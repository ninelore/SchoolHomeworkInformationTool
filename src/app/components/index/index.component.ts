import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  constructor(
    private accountService: AccountService,
  ) { }

  getName(): string {
    let user = this.accountService.getUser();
    if (user != null) {
      return user.name;
    } else {
      return "";
    }
  }
}
