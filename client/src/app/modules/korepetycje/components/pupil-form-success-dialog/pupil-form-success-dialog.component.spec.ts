import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PupilFormSuccessDialogComponent } from './pupil-form-success-dialog.component';

describe('PupilFormSuccessDialogComponent', () => {
    let component: PupilFormSuccessDialogComponent;
    let fixture: ComponentFixture<PupilFormSuccessDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PupilFormSuccessDialogComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PupilFormSuccessDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
