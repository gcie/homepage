import { Component, ElementRef, forwardRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
    selector: 'multiselect-checkbox-with-option',
    templateUrl: './multiselect-checkbox-with-option.component.html',
    styleUrls: ['./multiselect-checkbox-with-option.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiselectCheckboxWithOptionComponent),
            multi: true,
        },
    ],
})
export class MultiselectCheckboxWithOptionComponent implements ControlValueAccessor {
    valueKeys: string[] = [];
    value: { [name: string]: string } = {};
    checked: { [name: string]: boolean } = {};

    customValue: (string | null)[] = [];
    customChecked: boolean[] = [];
    customName: string[] = [];
    customId: number[] = [];

    newCustomCheckboxState = false;

    _onChange = (_: any) => {};

    @Input() allowCustom: number | string;
    @Input() customPlaceholder: string;
    @Input() options: string[];
    @Input() optionsPlaceholder: string;

    @ViewChildren('menu') menus: QueryList<MatMenu>;
    @ViewChildren('customInput') customInput: QueryList<ElementRef>;
    @ViewChild('newCustomCheckbox') newCustomCheckbox: MatCheckbox;
    @ViewChildren(MatMenuTrigger) menuTriggers: QueryList<MatMenuTrigger>;

    writeValue(value: any): void {
        this.checked = value;
        this.valueKeys = value ? Object.keys(value) : [];
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched() {}

    setValue(option: string, value: string) {
        console.log(option, value);
        this.value[option] = value;
    }

    onChange(option?: string, menuTrigger?: MatMenuTrigger) {
        if (option && this.checked[option] && menuTrigger) {
            menuTrigger.openMenu();
        }

        this._onChange(
            Object.assign(
                {},
                this.checked,
                this.customName.reduce((o, n, i) => {
                    o[n] = this.customValue[i];
                    return o;
                }, {})
            )
        );
    }

    addCustom() {
        this.customName.push('');
        this.customValue.push(null);
        this.customChecked.push(true);
        this.customId.push(this.customId.length);
        setTimeout(() => this.customInput.last.nativeElement.focus(), 0);
    }

    trigger(menu, option) {
        console.log(menu);
        console.log(option);
    }
}
