import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

    constructor(private api: ApiService) {
        this.observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                this.minLines.next(entry.contentRect.height / 16);
            });
        });
    }

    ngAfterViewInit(): void {
        this.observer.observe(this.editorWrapper.nativeElement);
        // this.minLines.next(this.editorWrapper.nativeElement.offsetHeight / 16);
    }

    test1() {
        this.api.getExercises().subscribe(console.log, console.error);
    }
}
