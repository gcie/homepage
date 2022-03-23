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
    code?: string;

    pending: boolean[] = [];

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
        this.pending = this.exercise?.testcases.map(() => false) || [];
        this.code = this.exercise?.lastProgram;
        console.log(this.exercise);
    }

    ngAfterViewInit(): void {
        this.observer.observe(this.editorWrapper.nativeElement);
    }

    runTestcase(index: number, event: Event) {
        event.stopPropagation();
        if (!this.exercise?._id) throw new Error('No exercise id');
        if (!this.code) throw new Error('No code to run');
        this.pending[index] = true;
        this.api.runTestcase({ exerciseId: this.exercise?._id, testcaseId: index + 1, body: { code: this.code } }).subscribe(
            (result) => {
                if (this.exercise) {
                    this.exercise.testcases[index] = {
                        ...this.exercise?.testcases[index],
                        ...result,
                    };
                }
            },
            console.warn,
            () => (this.pending[index] = false),
        );
    }

    getCode(code?: string) {
        return code?.replace(/\n/g, '<br />');
    }

    correctTestcases() {
        return this.exercise?.testcases.filter((t) => t.result === 'OK').length;
    }
}
