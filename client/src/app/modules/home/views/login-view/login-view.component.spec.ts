import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginViewComponent } from './login-view.component';

describe('LoginPageComponent', () => {
    let component: LoginViewComponent;
    let fixture: ComponentFixture<LoginViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginViewComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
