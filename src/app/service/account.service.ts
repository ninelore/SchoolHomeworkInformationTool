import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private user: User | null = null;
  constructor(
    private http: HttpClient
  ) { }

  isLoggedIn(): boolean {
    return this.user != null;
  }

  getUser(): User | null {
    if (this.user != null) {
      return this.user;
    }
    return null;
  }

  generateLoginLink(): string {
    let url = window.location.origin;
    return "https://discord.com/api/oauth2/authorize?client_id=1110085021454311554&redirect_uri=" + url + "&response_type=code&scope=email%20identify";
  }

  login(code: String): void {
    this.user = this.http.get<User>()
  }

  logout(): void {
    this.user = null;
  }
}
