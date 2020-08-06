import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { TutorsListComponent } from './tutors-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('TutorsListComponent', () => {
    let component: TutorsListComponent;
    let fixture: ComponentFixture<TutorsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TutorsListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [MatTableModule, HttpClientModule, RouterTestingModule, MatDialogModule, MatSnackBarModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TutorsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
