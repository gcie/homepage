import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavContentComponent } from './sidenav-content.component';

describe('SidenavContentComponent', () => {
    let component: SidenavContentComponent;
    let fixture: ComponentFixture<SidenavContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SidenavContentComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [HttpClientModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
