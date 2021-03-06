import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { KorepetycjeSidenavMenuComponent } from './korepetycje-sidenav-menu.component';

describe('KorepetycjeSidenavContentComponent', () => {
    let component: KorepetycjeSidenavMenuComponent;
    let fixture: ComponentFixture<KorepetycjeSidenavMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KorepetycjeSidenavMenuComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [HttpClientModule, RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KorepetycjeSidenavMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
