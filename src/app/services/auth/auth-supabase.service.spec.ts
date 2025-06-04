import { TestBed } from '@angular/core/testing';

import { AuthSupabaseService } from './auth-supabase.service';

describe('AuthSupabaseService', () => {
  let service: AuthSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
