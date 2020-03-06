import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavMenuComponent } from './sidenav-menu.component';

describe('SidenavContentComponent', () => {
    let component: SidenavMenuComponent;
    let fixture: ComponentFixture<SidenavMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SidenavMenuComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [HttpClientModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
