import { dest, src, task, watch } from 'gulp';
import { createProject } from 'gulp-typescript';

const tsProject = createProject('tsconfig.json');

function build(done: (error?: any) => any) {
    try {
        src('src/**/*.ts').pipe(tsProject()).pipe(dest('dist'));
        done();
    } catch (err) {
        done(err);
    }
}

task('default', () => watch(['src/**/*.ts'], build));
