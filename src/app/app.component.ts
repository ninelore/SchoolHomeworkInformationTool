import {Component, OnInit} from '@angular/core';
import {AccountService} from "./service/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menuItems = new Map<String, String>([
    ["list", "Overview"],
    ["test", "Test"]
  ]);

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code != null) {
      //accountService.login // TBD
    }
  }

  isLoggedIn(): boolean {
    //return this.accountService.isLoggedIn();
    return true;
  }

  getLoginLink(): string {
    return this.accountService.generateLoginLink();
  }
}
