import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonCourseSidenavMenuComponent } from './python-course-sidenav-menu.component';

describe('PythonCourseSidenavMenuComponent', () => {
  let component: PythonCourseSidenavMenuComponent;
  let fixture: ComponentFixture<PythonCourseSidenavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PythonCourseSidenavMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PythonCourseSidenavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
