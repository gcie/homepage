import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonExerciseComponent } from './python-exercise.component';

describe('PythonExerciseComponent', () => {
  let component: PythonExerciseComponent;
  let fixture: ComponentFixture<PythonExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PythonExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PythonExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
