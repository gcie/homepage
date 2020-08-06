import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KorepetycjeHomeComponent } from './korepetycje-home.component';

describe('KorepetycjeHomePageComponent', () => {
    let component: KorepetycjeHomeComponent;
    let fixture: ComponentFixture<KorepetycjeHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KorepetycjeHomeComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [HttpClientModule, RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KorepetycjeHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
