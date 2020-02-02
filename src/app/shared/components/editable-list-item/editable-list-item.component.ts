import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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

    dataControl: FormControl;

    _value: string;
    editMode = false;
    wasInsideClick = false;

    @Input() set value(value: string) {
        this.editMode = false;
        this._value = value;

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
        this.dataControl = new FormControl(value, validators);
    }

    get value() {
        return this._value;
    }

    submit() {
        if (this.dataControl.valid) {
            this.editMode = false;
            this.save.emit(this.dataControl.value);
        }
    }

    cancel() {
        this.editMode = false;
    }

    @HostListener('click')
    clickInside() {
        this.wasInsideClick = true;
    }

    @HostListener('document:click')
    clickout() {
        if (!this.wasInsideClick) {
            this.cancel();
        }
        this.wasInsideClick = false;
    }
}
