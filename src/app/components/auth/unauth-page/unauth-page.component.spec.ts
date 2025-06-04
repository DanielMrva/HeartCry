import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthPageComponent } from './unauth-page.component';

describe('UnauthPageComponent', () => {
  let component: UnauthPageComponent;
  let fixture: ComponentFixture<UnauthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
