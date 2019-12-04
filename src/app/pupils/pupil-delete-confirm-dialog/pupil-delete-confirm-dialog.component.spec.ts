import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PupilDeleteConfirmDialogComponent } from './pupil-delete-confirm-dialog.component';

describe('PupilDeleteConfirmDialogComponent', () => {
    let component: PupilDeleteConfirmDialogComponent;
    let fixture: ComponentFixture<PupilDeleteConfirmDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PupilDeleteConfirmDialogComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PupilDeleteConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
