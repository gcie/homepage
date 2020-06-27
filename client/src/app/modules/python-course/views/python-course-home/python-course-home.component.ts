import { Component } from '@angular/core';

@Component({
    selector: 'app-python-course-home',
    templateUrl: './python-course-home.component.html',
    styleUrls: ['./python-course-home.component.scss'],
})
export class PythonCourseHomeComponent {
    sidenav;

    DECLARATION_EXAMPLE_1 = `<identyfikator> = <wartość>`;
    source: string = `
def f(x):
    return x * x
    `.trim();

    constructor() {}
}
