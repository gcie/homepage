import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { message: string; title?: string; okButtonLabel?: string; cancelButtonLabel?: string }
    ) {
        data.okButtonLabel = data.okButtonLabel || 'Tak';
        data.cancelButtonLabel = data.cancelButtonLabel || 'Anuluj';
        data.title = data.title || 'Potwierdź';
    }
}
