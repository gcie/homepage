import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-course-navigation-bar',
    templateUrl: './course-navigation-bar.component.html',
    styleUrls: ['./course-navigation-bar.component.scss'],
})
export class CourseNavigationBarComponent {
    @Input() forward: string;
    @Input() forwardLabel: string;

    constructor(private router: Router) {}

    forwardClick() {
        this.router.navigateByUrl(`/python/${this.forward}`);
    }
}
