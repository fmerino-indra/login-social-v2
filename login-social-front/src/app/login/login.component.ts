import { Component, OnInit } from '@angular/core';
import { ACCESS_TOKEN, GITHUB_AUTH_URL, GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../constants/constants';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  githubAuthUrl = GITHUB_AUTH_URL;
  googleAuthUrl = GOOGLE_AUTH_URL;
  facebookAuthUrl = FACEBOOK_AUTH_URL;
  constructor() {
  }

  ngOnInit() {}
}
