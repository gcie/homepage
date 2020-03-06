import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilDetailedViewComponent } from './pupil-detailed-view.component';
import { HttpClientModule } from '@angular/common/http';

describe('PupilDetailedViewComponent', () => {
    let component: PupilDetailedViewComponent;
    let fixture: ComponentFixture<PupilDetailedViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PupilDetailedViewComponent],
            imports: [HttpClientModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PupilDetailedViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
