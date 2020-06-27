import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonCourseHomeComponent } from './python-course-home.component';

describe('PythonCourseHomeComponent', () => {
    let component: PythonCourseHomeComponent;
    let fixture: ComponentFixture<PythonCourseHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PythonCourseHomeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PythonCourseHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
