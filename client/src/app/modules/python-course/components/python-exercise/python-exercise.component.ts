import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Exercise } from 'src/app/core/models/exercise';
import { CodeEditorComponent } from 'src/app/shared/components/code-editor/code-editor.component';
import { PythonCourseApiService } from '../../services/python-course-api.service';

@Component({
    selector: 'app-python-exercise',
    templateUrl: './python-exercise.component.html',
    styleUrls: ['./python-exercise.component.scss'],
})
export class PythonExerciseComponent implements OnInit {
    @Input('id') id: string;
    @Input('titlePrefix') titlePrefix: string;
    @Input() mode: string;

    @ViewChild('editor') editor: CodeEditorComponent;

    exercise: Exercise;

    status: '' | 'success' | 'failure' | 'in-progress';

    constructor(private courseService: PythonCourseApiService) {}

    ngOnInit(): void {
        this.courseService.getExercise(this.id).subscribe((exercise) => {
            this.editor.setContent(exercise.solution || exercise.content);
            this.exercise = exercise;
            this.status = exercise.done ? 'success' : '';
        });
    }

    submit() {
        const content = this.editor.getContent();
        if (content) {
            this.status = 'in-progress';
            this.courseService.submitExercise(this.id, content || '').subscribe((result) => {
                this.exercise.score = result.score;
                this.exercise.done = result.score === this.exercise.maxPoints;
                this.status = this.exercise.done ? 'success' : 'failure';
            });
        }
    }
}
