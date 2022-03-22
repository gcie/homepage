import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ExerciseDto } from 'src/app/api/models';
import { RunTestcaseOutDto } from 'src/app/api/models/run-testcase-out-dto';
import { ApiService } from 'src/app/api/services';

@Component({
    selector: 'app-gym-exercise-mobile',
    templateUrl: './gym-exercise-mobile.component.html',
    styleUrls: ['./gym-exercise-mobile.component.scss'],
})
export class GymExerciseMobileComponent implements AfterViewInit {
    @ViewChild('editorWrapper') editorWrapper!: ElementRef;

    minLines = new BehaviorSubject(12);
    observer: ResizeObserver;
    exercise: ExerciseDto | undefined;
    status: 'waiting' | 'pending' | 'success' | 'failure' | 'error' = 'waiting';
    results: RunTestcaseOutDto[] = [];

    constructor(private api: ApiService, private route: ActivatedRoute) {
        this.observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                this.minLines.next(entry.contentRect.height / 16);
            });
        });
    }

    ngOnInit() {
        this.exercise = this.route.snapshot.data.exercise;
        this.results = this.exercise?.testcases.map(() => ({})) || [];
        console.log(this.exercise);
    }

    ngAfterViewInit(): void {
        this.observer.observe(this.editorWrapper.nativeElement);
        // this.minLines.next(this.editorWrapper.nativeElement.offsetHeight / 16);
    }

    test1() {
        this.api.getExercises().subscribe(console.log, console.error);
    }

    runTestcase(index: number, event: Event) {
        event.stopPropagation();
    }

    getCode(code?: string) {
        return code?.replace(/\n/g, '<br />');
    }
}
