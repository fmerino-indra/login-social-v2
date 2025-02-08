import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GoInRedirectComponent } from './go-in-redirect/go-in-redirect.component';
import { HomeComponent } from './home/home.component';

//export const routes: Routes = [];

export const routeConfig: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
  },
  { path: 'oauth2/redirect', component: GoInRedirectComponent },
  { path: 'home', component: HomeComponent },
  { path: '?token', component: GoInRedirectComponent,  },
];
