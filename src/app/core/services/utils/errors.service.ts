import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ErrorsService {
    constructor(private snackBar: MatSnackBar) {}

    snack(message) {
        this.snackBar.open(message, 'Zamknij', { duration: 5000 });
    }
}
