import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNavigationBarComponent } from './course-navigation-bar.component';

describe('CourseNavigationBarComponent', () => {
  let component: CourseNavigationBarComponent;
  let fixture: ComponentFixture<CourseNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
