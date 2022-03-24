import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ExerciseDto } from 'src/app/api/models';
import { RunTestcaseOutDto } from 'src/app/api/models/run-testcase-out-dto';
import { ApiService } from 'src/app/api/services';
import { ExerciseSubmitDialogComponent } from '../../components/exercise-submit-dialog/exercise-submit-dialog.component';

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
    submitPending = false;

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private router: Router,
        public location: Location,
    ) {
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

    runTest(index: number, event: Event) {
        event.stopPropagation();
        if (!this.exercise?._id) throw new Error('No exercise id');
        if (!this.code) throw new Error('No code to run');
        this.pending[index] = true;
        this.api.runTestcase({ exerciseId: this.exercise?._id, testcaseId: index + 1, body: { code: this.code } }).subscribe(
            (result) => {
                if (this.exercise)
                    this.exercise.testcases[index] = {
                        ...this.exercise?.testcases[index],
                        ...result,
                    };
            },
            () => (this.pending[index] = false),
            () => (this.pending[index] = false),
        );
    }

    runTests() {
        if (!this.exercise?._id) throw new Error('No exercise id');
        if (!this.code) throw new Error('No code to run');
        this.pending = this.pending.map(() => true);
        this.api.runTestcases({ exerciseId: this.exercise._id, body: { code: this.code } }).subscribe(
            (results) => {
                if (this.exercise) this.exercise.testcases = this.exercise.testcases.map((testcase, i) => ({ ...testcase, ...results[i] }));
            },
            console.error,
            () => (this.pending = this.pending.map(() => false)),
        );
    }

    getCode(code?: string) {
        return code?.replace(/\n/g, '<br />');
    }

    correctTestcases() {
        return this.exercise?.testcases.filter((t) => t.result === 'OK').length;
    }

    submittable() {
        return this.correctTestcases() == this.exercise?.testcases.length;
    }

    submit() {
        if (!this.exercise?._id) throw new Error('No exercise id');
        if (!this.code) throw new Error('No code to run');
        this.submitPending = true;
        this.api.submitExercise({ exerciseId: this.exercise._id, body: { code: this.code } }).subscribe(
            (submissionId) => {
                this.dialog
                    .open(ExerciseSubmitDialogComponent, { data: submissionId, width: '250px', hasBackdrop: false })
                    .afterClosed()
                    .subscribe((x) => {
                        if (x) this.router.navigateByUrl('/python/gym');
                    });
            },
            console.error,
            () => (this.submitPending = false),
        );
    }
}
