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

    @ViewChild('editor') editor: CodeEditorComponent;

    exercise: Exercise;

    done = '';

    constructor(private courseService: PythonCourseApiService) {}

    ngOnInit(): void {
        console.log('exercise oninit');
        this.courseService.getExercise(this.id).subscribe((exercise) => {
            this.editor.setContent(exercise.content);
            this.exercise = exercise;
        });
    }

    submit() {
        const content = this.editor.getContent();
        console.log(content);
        if (content)
            this.courseService.submitExercise(this.id, this.editor.getContent() || '').subscribe((result) => {
                this.done = result.success ? 'success' : 'failure';
            });
    }
}
