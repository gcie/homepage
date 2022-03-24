import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSubmitDialogComponent } from './exercise-submit-dialog.component';

describe('ExerciseSubmitDialogComponent', () => {
  let component: ExerciseSubmitDialogComponent;
  let fixture: ComponentFixture<ExerciseSubmitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseSubmitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseSubmitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
