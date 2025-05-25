import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerRequestFormComponent } from './prayer-request-form.component';

describe('PrayerRequestFormComponent', () => {
  let component: PrayerRequestFormComponent;
  let fixture: ComponentFixture<PrayerRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrayerRequestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayerRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
