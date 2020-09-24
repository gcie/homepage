import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PupilNewFormComponent } from './pupil-new-form.component';

describe('PupilNewFormComponent', () => {
    let component: PupilNewFormComponent;
    let fixture: ComponentFixture<PupilNewFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PupilNewFormComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PupilNewFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
