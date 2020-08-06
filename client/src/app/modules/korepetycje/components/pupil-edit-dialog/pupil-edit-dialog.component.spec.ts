import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PupilEditDialogComponent } from './pupil-edit-dialog.component';

describe('PupilEditDialogComponent', () => {
    let component: PupilEditDialogComponent;
    let fixture: ComponentFixture<PupilEditDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PupilEditDialogComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [ReactiveFormsModule, MatDialogModule, HttpClientModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ]
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
