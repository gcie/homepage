import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymExerciseMobileComponent } from './gym-exercise-mobile.component';

describe('GymExerciseMobileComponent', () => {
  let component: GymExerciseMobileComponent;
  let fixture: ComponentFixture<GymExerciseMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymExerciseMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymExerciseMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
