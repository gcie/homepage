import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAddDialogComponent } from './user-add-dialog.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserAddDialogComponent', () => {
    let component: UserAddDialogComponent;
    let fixture: ComponentFixture<UserAddDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserAddDialogComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [ReactiveFormsModule, MatDialogModule, HttpClientModule, RouterTestingModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: {} }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserAddDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
