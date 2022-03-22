import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseDescDto } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';

@Component({
    selector: 'app-gym-mobile',
    templateUrl: './gym-mobile.component.html',
    styleUrls: ['./gym-mobile.component.scss'],
})
export class GymMobileComponent implements OnInit {
    exercises: ExerciseDescDto[] | undefined;

    constructor(private api: ApiService, private router: Router) {}

    ngOnInit(): void {
        this.api.getExercises().subscribe((data) => {
            this.exercises = data.exercises;
        });
    }

    open(id: string) {
        this.router.navigateByUrl(`/python/gym/${id}`);
    }
}
