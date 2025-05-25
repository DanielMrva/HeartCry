import { TestBed } from '@angular/core/testing';

import { ChurchSupabaseService } from './church-supabase.service';

describe('ChurchSupabaseService', () => {
  let service: ChurchSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChurchSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
