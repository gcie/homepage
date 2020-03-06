import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDetailedViewComponent } from './tutor-detailed-view.component';
import { HttpClientModule } from '@angular/common/http';

describe('TutorDetailedViewComponent', () => {
    let component: TutorDetailedViewComponent;
    let fixture: ComponentFixture<TutorDetailedViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TutorDetailedViewComponent],
            imports: [HttpClientModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TutorDetailedViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
