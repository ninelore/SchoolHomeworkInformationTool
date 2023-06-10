import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
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
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    const code = new URLSearchParams(window.location.search).get("code");
    const storedToken = localStorage.getItem("SESSIONTOKEN");
    if (!this.isLoggedIn()) {
      if (storedToken != null && storedToken.length > 0) {
        this.accountService.loginWithToken(storedToken);
        this.router.navigateByUrl('/');
      } else if (code != null) {
        this.accountService.loginWithCode(code);
        this.router.navigateByUrl('/');
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
