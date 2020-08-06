import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersViewComponent } from './users-view.component';

describe('UsersPageComponent', () => {
    let component: UsersViewComponent;
    let fixture: ComponentFixture<UsersViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UsersViewComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
