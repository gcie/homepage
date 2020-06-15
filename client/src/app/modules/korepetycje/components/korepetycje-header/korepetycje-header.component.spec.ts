import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KorepetycjeHeaderComponent } from './korepetycje-header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('KorepetycjeHeaderComponent', () => {
    let component: KorepetycjeHeaderComponent;
    let fixture: ComponentFixture<KorepetycjeHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KorepetycjeHeaderComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [HttpClientModule, RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KorepetycjeHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
