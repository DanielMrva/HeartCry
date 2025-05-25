import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrayerRequestService } from '../../../services/prayerRequests/prayer-request.service';
import { PrayerRequestSupabaseService } from '../../../services/prayerRequests/prayer-request-supabase.service';
import { PrayerRequest, RequestType, Church } from '../../../../types/types';
@Component({
  selector: 'app-prayer-request-form',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './prayer-request-form.component.html',
  styleUrl: './prayer-request-form.component.css'
})
export class PrayerRequestFormComponent implements OnInit {

  prayerRequestForm = new FormGroup({
    churchId: new FormControl<string | null>(null, Validators.required),
    contentText: new FormControl<string | null>( '', Validators.required),
    requestType: new FormControl<RequestType>('text', Validators.required),
    anonymous: new FormControl<boolean>(false)
  });

  loading = signal(false);
  error = signal<string | null>(null);

  requestTypes: RequestType[] = ['text', 'audio', 'video'];

  constructor(
    private prayerRequestService: PrayerRequestService,
    private prayerRequestSupabase: PrayerRequestSupabaseService
  ) {}

  ngOnInit(): void {
      
  }

  onSubmit() {
    if (this.prayerRequestForm.invalid) {
      this.error.set('Please fill in all required fields.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const {churchId, contentText, requestType, anonymous} = this.prayerRequestForm.value as {
      churchId: string;
      contentText: string;
      requestType: RequestType;
      anonymous: boolean;
    };

    const payload: Omit<PrayerRequest, 'id' | 'created_at' | 'status'> = {
      church_id: churchId,
      user_id: null,
      content_text: contentText,
      request_type: requestType,
      anonymous,
    };

    this.prayerRequestSupabase.addPrayerRequest(payload as PrayerRequest).subscribe(
      (pr: PrayerRequest) => {
        this.prayerRequestService.prayerRequestSignal.set([pr]);
        this.loading.set(false);
        this.prayerRequestForm.reset();
        this.error.set(null);
      },
      (err: any) => {
        this.loading.set(false);
        this.error.set('Failed to create prayer request. Please try again.');
        console.error(err);
      },
      () => {
        this.loading.set(false);
      }
    )
  }
}
