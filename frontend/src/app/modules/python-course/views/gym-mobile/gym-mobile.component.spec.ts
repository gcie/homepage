import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymMobileComponent } from './gym-mobile.component';

describe('GymMobileComponent', () => {
  let component: GymMobileComponent;
  let fixture: ComponentFixture<GymMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
