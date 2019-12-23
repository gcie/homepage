import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilEditDialogComponent } from './pupil-edit-dialog.component';

describe('PupilEditDialogComponent', () => {
    let component: PupilEditDialogComponent;
    let fixture: ComponentFixture<PupilEditDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PupilEditDialogComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PupilEditDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
