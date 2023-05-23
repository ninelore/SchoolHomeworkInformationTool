import {Component} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  generateLink(): string {
    let url = window.location.origin + window.location.pathname;
    return "https://discord.com/api/oauth2/authorize?client_id=1110085021454311554&redirect_uri=" + url + "&response_type=code&scope=email%20identify";
  }
}
