import { TestBed } from '@angular/core/testing';

import { PupilsService } from './pupils.service';
import { HttpClientModule } from '@angular/common/http';

describe('PupilsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        })
    );

    it('should be created', () => {
        const service: PupilsService = TestBed.get(PupilsService);
        expect(service).toBeTruthy();
    });
});
