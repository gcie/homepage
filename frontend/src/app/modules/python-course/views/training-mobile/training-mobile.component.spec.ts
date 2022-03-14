import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMobileComponent } from './training-mobile.component';

describe('TrainingMobileComponent', () => {
  let component: TrainingMobileComponent;
  let fixture: ComponentFixture<TrainingMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
