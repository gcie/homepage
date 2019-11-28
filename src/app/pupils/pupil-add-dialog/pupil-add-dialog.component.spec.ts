import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilAddDialogComponent } from './pupil-add-dialog.component';

describe('PupilAddDialogComponent', () => {
  let component: PupilAddDialogComponent;
  let fixture: ComponentFixture<PupilAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PupilAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
