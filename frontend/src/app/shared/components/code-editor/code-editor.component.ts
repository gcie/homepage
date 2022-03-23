import { coerceNumberProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-tomorrow_night';

const INIT_CONTENT = '';
const THEME = 'ace/theme/tomorrow_night';
const LANG = 'ace/mode/python';

@Component({
    selector: 'app-code-editor',
    templateUrl: './code-editor.component.html',
    styleUrls: ['./code-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditorComponent implements AfterViewInit {
    private codeEditor?: ace.Ace.Editor;
    private editorBeautify: any; // beautify extension

    @ViewChild('codeEditor') private codeEditorElmRef!: ElementRef;

    @Input() content?: string;
    @Output() contentChange = new EventEmitter<string>();

    @Input() set minLines(value: any) {
        this._minLines = coerceNumberProperty(value);
        this.codeEditor?.setOption('minLines', this._minLines);
    }
    get minLines() {
        return this._minLines;
    }
    private _minLines = 12;

    @Input() set fontSize(value: any) {
        this._fontSize = coerceNumberProperty(value);
        this.codeEditor?.setOption('fontSize', this._fontSize);
    }
    get fontSize() {
        return this._fontSize;
    }
    private _fontSize = 14;

    ngAfterViewInit() {
        ace.require('ace/ext/language_tools');
        const element = this.codeEditorElmRef.nativeElement;
        console.log('CodeEditor', element);
        const editorOptions = this.getEditorOptions();
        this.codeEditor = this.createCodeEditor(element, editorOptions);
        this.setContent(this.content || INIT_CONTENT);
        this.editorBeautify = ace.require('ace/ext/beautify');
        this.codeEditor?.on('change', (delta) => {
            this.contentChange.emit(this.codeEditor?.getValue());
        });
    }

    private createCodeEditor(element: Element, options: any): ace.Ace.Editor {
        const editor = ace.edit(element, options);
        editor.setTheme(THEME);
        editor.getSession().setMode(LANG);
        editor.setShowFoldWidgets(true);
        editor.resize();
        return editor;
    }

    // missing propery on EditorOptions 'enableBasicAutocompletion' so this is a workaround still using ts
    private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean } {
        const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
            highlightActiveLine: true,
            minLines: this.minLines,
            maxLines: Infinity,
            fontSize: this.fontSize,
        };
        const extraEditorOptions = { enableBasicAutocompletion: true };
        return Object.assign(basicEditorOptions, extraEditorOptions);
    }

    /**
     * @returns - the current editor's content.
     */
    public getContent() {
        return this.codeEditor?.getValue();
    }

    /**
     * @param content - set as the editor's content.
     */
    public setContent(content: string): void {
        this.codeEditor?.setValue(content);
    }

    /**
     * @description
     *  beautify the editor content, rely on Ace Beautify extension.
     */
    public beautifyContent() {
        if (this.codeEditor && this.editorBeautify) {
            const session = this.codeEditor.getSession();
            this.editorBeautify.beautify(session);
        }
    }
}
