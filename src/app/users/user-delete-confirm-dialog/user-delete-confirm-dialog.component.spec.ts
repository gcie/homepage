import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteConfirmDialogComponent } from './user-delete-confirm-dialog.component';

describe('UserDeleteConfirmDialogComponent', () => {
    let component: UserDeleteConfirmDialogComponent;
    let fixture: ComponentFixture<UserDeleteConfirmDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserDeleteConfirmDialogComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDeleteConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
