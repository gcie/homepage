import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PythonCourseComponent } from './python-course.component';

describe('PythonCourseComponent', () => {
    let component: PythonCourseComponent;
    let fixture: ComponentFixture<PythonCourseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PythonCourseComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PythonCourseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
