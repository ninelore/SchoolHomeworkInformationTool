import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userId: number | null = null;
  constructor() { }

  isLoggedIn(): boolean {
    return this.userId != null;
  }

  getUser(): number | null {
    if (this.userId != null) {
      return this.userId;
    }
    return null;
  }

  generateLoginLink(): string {
    let url = window.location.origin;
    return "https://discord.com/api/oauth2/authorize?client_id=1110085021454311554&redirect_uri=" + url + "&response_type=code&scope=email%20identify";
  }
}
