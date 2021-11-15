import { Component, Input, ViewChild } from '@angular/core';
import { Exercise } from 'src/app/core/models/exercise';
import { CodeEditorComponent } from 'src/app/shared/components/code-editor/code-editor.component';
import { PythonCourseApiService } from '../../services/python-course-api.service';

@Component({
    selector: 'app-python-exercise',
    templateUrl: './python-exercise.component.html',
    styleUrls: ['./python-exercise.component.scss'],
})
export class PythonExerciseComponent {
    @Input() set id(id: string | undefined) {
        this._id = id;
        if (id) {
            this.updateExerciseContent(id);
        }
    }
    get id() {
        return this._id;
    }
    private _id?: string;

    @Input() mode?: string;

    @ViewChild('editor') editor!: CodeEditorComponent;

    exercise?: Exercise;

    status: '' | 'success' | 'failure' | 'in-progress' = '';

    constructor(private courseService: PythonCourseApiService) {}

    updateExerciseContent(id: string) {
        this.courseService.getExercise(id).subscribe((exercise) => {
            this.editor.setContent(exercise.solution || exercise.content);
            this.exercise = exercise;
            this.status = exercise.done ? 'success' : '';
        });
    }

    submit() {
        const content = this.editor.getContent();
        const exercise = this.exercise;
        if (content && exercise) {
            this.status = 'in-progress';
            this.courseService.submitExercise(this.id || '', content || '').subscribe((result) => {
                exercise.score = result.score;
                exercise.done = result.score === exercise.maxPoints;
                this.status = exercise.done ? 'success' : 'failure';
                this.exercise = exercise;
            });
        }
    }
}
