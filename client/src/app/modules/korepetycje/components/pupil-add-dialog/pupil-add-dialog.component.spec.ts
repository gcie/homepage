import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PupilAddDialogComponent } from './pupil-add-dialog.component';
import { HttpClientModule } from '@angular/common/http';

describe('PupilAddDialogComponent', () => {
    let component: PupilAddDialogComponent;
    let fixture: ComponentFixture<PupilAddDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PupilAddDialogComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [ReactiveFormsModule, MatDialogModule, HttpClientModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PupilAddDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
