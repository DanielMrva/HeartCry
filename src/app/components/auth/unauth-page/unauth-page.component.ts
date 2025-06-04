import { Component } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-unauth-page',
  imports: [
    CommonModule,
    SignupComponent,
    LoginComponent,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './unauth-page.component.html',
  styleUrl: './unauth-page.component.css'
})
export class UnauthPageComponent {

  isLogin = true;

  toggleLogin() {
    this.isLogin = !this.isLogin;
  }

}
