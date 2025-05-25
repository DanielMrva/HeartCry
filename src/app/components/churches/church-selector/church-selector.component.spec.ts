import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchSelectorComponent } from './church-selector.component';

describe('ChurchSelectorComponent', () => {
  let component: ChurchSelectorComponent;
  let fixture: ComponentFixture<ChurchSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChurchSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurchSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
