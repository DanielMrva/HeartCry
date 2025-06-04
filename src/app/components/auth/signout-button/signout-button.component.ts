import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-button',
  imports: [MatButtonModule],
  standalone: true,
  templateUrl: './signout-button.component.html',
  styleUrl: './signout-button.component.css'
})
export class SignoutButtonComponent {

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

}
