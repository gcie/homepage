import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

@Component({
    selector: 'app-editable-list-item',
    templateUrl: './editable-list-item.component.html',
    styleUrls: ['./editable-list-item.component.scss']
})
export class EditableListItemComponent {
    @Input() validator: string | ValidatorFn | ValidatorFn[];
    @Input() type: string;

    @Output() save = new EventEmitter<string>();

    _data: string;
    dataControl: FormControl;
    editMode = false;

    @Input() set data(data: string) {
        this.editMode = false;
        this._data = data;

        let validators: ValidatorFn[] = [];
        if (this.validator) {
            if (typeof this.validator === 'string') {
                switch (this.validator) {
                    case 'email':
                        validators.push(Validators.email);
                        break;
                    case 'required':
                        validators.push(Validators.required);
                        break;
                }
            } else if (this.validator instanceof Array) {
                validators = this.validator;
            } else {
                validators = [this.validator];
            }
        }
        this.dataControl = new FormControl(data, validators);
    }

    get data() {
        return this._data;
    }

    editData() {
        this.editMode = true;
    }

    saveData() {
        this.editMode = false;
        this.save.emit(this.dataControl.value);
    }
}
