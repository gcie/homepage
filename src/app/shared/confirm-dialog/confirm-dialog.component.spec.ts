import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmDialogComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [MatDialogModule],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: { message: 'Testowa wiadomość' }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
