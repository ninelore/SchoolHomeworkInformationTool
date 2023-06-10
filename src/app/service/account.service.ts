import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../models/user";
import {AuthRequestData} from "../models/authRequestData";
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public redirUrl: String = window.location.origin;
  private user: User | null = null;
  private headers: string[] = [];
  private status: number = 0;

  constructor(
    private http: HttpClient
  ) {
  }

  isLoggedIn(): boolean {
    return this.user != null;
  }

  getUser(): User | null {
    return this.user;
  }

  generateLoginLink(): String {
    let url = window.location.origin;
    return "https://discord.com/api/oauth2/authorize?client_id=1110085021454311554&redirect_uri=" + url + "&response_type=code&scope=email%20identify";
  }

  loginWithCode(code: String): void {
    const redirUrl = this.redirUrl;
    let authdata: AuthRequestData = {code, redirUrl}
    this.http.post<User>(
      environment.serviceUrl + '/rest/auth/authWithCode',
      authdata,
      {observe: "response"}
    )
      .subscribe(resp => {
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
        this.user = resp.body;
      });
    if (this.user?.token) {
      localStorage.setItem("SESSIONTOKEN", this.user?.token)
    }
  }

  loginWithToken(code: String, code2: String): void {
    const redirUrl = this.redirUrl;
    let authdata: AuthRequestData = {code, redirUrl}
    this.http.post<User>(
      environment.serviceUrl + '/rest/auth/authWithToken/' + code + "/" + this.redirUrl,
      authdata,
      {observe: "response"}
    )
      .subscribe(resp => {
        const keys = resp.headers.keys();
        this.status = resp.status;
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
        this.user = resp.body;
      });
    if (this.status == 403){
      localStorage.removeItem("SESSIONTOKEN");
      this.loginWithCode(code2);
    }
  }

  logout(): void {
    this.user = null;
  }
}
