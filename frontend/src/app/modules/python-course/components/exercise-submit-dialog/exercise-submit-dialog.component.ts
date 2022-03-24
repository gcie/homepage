import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { exhaustMap, filter, take, tap } from 'rxjs/operators';
import { SubmissionDto } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';

@Component({
    selector: 'app-exercise-submit-dialog',
    templateUrl: './exercise-submit-dialog.component.html',
    styleUrls: ['./exercise-submit-dialog.component.scss'],
})
export class ExerciseSubmitDialogComponent implements OnInit {
    submission?: SubmissionDto;

    constructor(@Inject(MAT_DIALOG_DATA) private submissionId: string, private api: ApiService) {}

    ngOnInit(): void {
        timer(0, 500)
            .pipe(
                exhaustMap(() => this.api.getSubmission({ submissionId: this.submissionId })),
                tap((submission) => (this.submission = submission)),
                filter((submission) => submission.status != 'WAITING' && submission.status != 'RUNNING'),
                take(1),
            )
            .subscribe();
    }
}
