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
    console.log("Hello Init")
    const code = new URLSearchParams(window.location.search).get("code");
    const storedToken = localStorage.getItem("SESSIONTOKEN");
    if (!this.isLoggedIn() && code != null) {
      if (storedToken != null && storedToken.length > 0) {
        this.accountService.loginWithToken(storedToken, code);
      } else {
        this.accountService.loginWithCode(code)
      }
    }
  }

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
    //return true;
  }

  getLoginLink(): String {
    return this.accountService.generateLoginLink();
  }
}
