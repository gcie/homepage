import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ExerciseDto } from 'src/app/api/models/exercise-dto';
import { ApiService } from 'src/app/api/services';

@Injectable()
export class GymExerciseMobileResolver implements Resolve<ExerciseDto> {
    constructor(private api: ApiService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ExerciseDto> {
        return this.api.getExercise({ exerciseId: route.paramMap.get('id')! });
    }
}
