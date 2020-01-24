import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDetailedViewComponent } from './tutor-detailed-view.component';

describe('TutorDetailedViewComponent', () => {
  let component: TutorDetailedViewComponent;
  let fixture: ComponentFixture<TutorDetailedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorDetailedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
