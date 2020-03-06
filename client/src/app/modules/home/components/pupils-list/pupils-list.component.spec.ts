import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { PupilsListComponent } from './pupils-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('PupilsListComponent', () => {
    let component: PupilsListComponent;
    let fixture: ComponentFixture<PupilsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PupilsListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [MatTableModule, HttpClientModule, RouterTestingModule, MatDialogModule, MatSnackBarModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PupilsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
