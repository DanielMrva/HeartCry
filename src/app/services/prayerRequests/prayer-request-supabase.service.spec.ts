import { TestBed } from '@angular/core/testing';

import { PrayerRequestSupabaseService } from './prayer-request-supabase.service';

describe('PrayerRequestSupabaseService', () => {
  let service: PrayerRequestSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrayerRequestSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
