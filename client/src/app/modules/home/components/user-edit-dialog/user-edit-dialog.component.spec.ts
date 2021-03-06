import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserEditDialogComponent } from './user-edit-dialog.component';

describe('UserEditDialogComponent', () => {
    let component: UserEditDialogComponent;
    let fixture: ComponentFixture<UserEditDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserEditDialogComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                ReactiveFormsModule,
                MatDialogModule,
                HttpClientModule,
                MatSelectModule,
                MatFormFieldModule,
                MatInputModule,
                BrowserAnimationsModule,
            ],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        name: 'Adam',
                        surname: 'Adamowski',
                        groups: [],
                        email: 'adam@adamowski.test.pl',
                        password: 'password',
                        _id: '123456',
                    },
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserEditDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
