import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
    let component: RegisterPageComponent;
    let fixture: ComponentFixture<RegisterPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterPageComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
