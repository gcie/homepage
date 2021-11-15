import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
    @Input() url?: string;

    @Input()
    set name(name: string) {
        this.url = `assets/img/python-course/${name}.png`;
    }
}
