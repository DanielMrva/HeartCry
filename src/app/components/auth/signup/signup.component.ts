import { Component, OnInit, signal, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  loading = false;

  constructor(
    private authService: AuthService,
    private injector: Injector
  ) { }

  signupForm = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email])
  });

  onSubmit() {
    if (this.signupForm.valid) {
      const { email } = this.signupForm.value;
      if (email) {
        this.authService.signup(email).subscribe({
          next: () => {
            // Handle successful signup
            alert('Check your email for the login link!')
            console.log('Signup successful');
          },
          error: (err) => {
            // Handle signup error
            console.error('Signup failed:', err);
          }
        });
      }
    } else {
      console.warn('Form is invalid');
    }
  }


}
