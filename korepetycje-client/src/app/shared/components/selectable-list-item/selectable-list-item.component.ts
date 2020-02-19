import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-selectable-list-item',
    templateUrl: './selectable-list-item.component.html',
    styleUrls: ['./selectable-list-item.component.scss']
})
export class SelectableListItemComponent implements OnInit {
    @Output() save = new EventEmitter<string>();

    _data: { _id?: string; name: string }[];
    _value: string;
    display: string;

    editMode = false;
    wasInsideClick = false;

    ngOnInit() {
        this.refreshDisplayValue();
    }

    @Input() set value(value: string) {
        this.editMode = false;
        this._value = value;
        this.refreshDisplayValue();
    }

    get value() {
        return this._value;
    }

    @Input() set data(data: { _id?: string; name: string }[]) {
        this.editMode = false;
        this._data = data?.concat({ name: '<brak>' });
        this.refreshDisplayValue();
    }

    get data() {
        return this._data;
    }

    refreshDisplayValue() {
        if (this.data && this.value) {
            const elem = this.data.find((e) => e._id === this.value);
            if (elem) this.display = elem.name;
        }
    }

    editData() {
        this.editMode = true;
    }

    submit() {
        this.editMode = false;
        const elem = this.data.find((e) => e._id === this.value);
        if (elem) this.display = elem.name;
        this.save.emit(this.value);
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
