import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from "./service/account.service";
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') public drawer: MatSidenav;

  menuItems = new Map<String, String>([
    ["list", "Overview"],
    ["test", "Test"]
  ]);
  breakpointObserver: any;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (this.drawer.opened) {
        this.drawer.close;
      }
    });
  }

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
