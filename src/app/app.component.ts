import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  _menuItems: Map<String, String>;

  constructor() {
    this._menuItems = new Map<String, String>();
    // Menu items
    this._menuItems.set("list", "Overview");
    this._menuItems.set("test", "Test");
  }

  isLoggedIn(): boolean {
    return true;
  }

  get menuItems(): Map<String, String> {
    return this._menuItems;
  }
}
