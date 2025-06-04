import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PrayerRequestFormComponent } from "./components/prayerRequests/prayer-request-form/prayer-request-form.component";
import { PrayerRequestsComponent } from './components/prayerRequests/prayer-requests/prayer-requests.component';
import { UnauthPageComponent } from './components/auth/unauth-page/unauth-page.component';
import { HeaderComponent } from './components/header/header/header.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [PrayerRequestFormComponent, PrayerRequestsComponent, RouterOutlet, UnauthPageComponent, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'HeartCry';



  constructor(public readonly authService: AuthService) { }

  ngOnInit() {

  }
}
