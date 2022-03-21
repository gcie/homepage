import { coerceNumberProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
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
})
export class CodeEditorComponent implements AfterViewInit {
    private codeEditor?: ace.Ace.Editor;
    private editorBeautify: any; // beautify extension

    @ViewChild('codeEditor') private codeEditorElmRef!: ElementRef;
    @Input() content?: string;
    @Input() mode?: string;

    @Input() set minLines(value: any) {
        this._minLines = coerceNumberProperty(value);
        this.codeEditor?.setOption('minLines', this._minLines);
    }
    get minLines() {
        return this._minLines;
    }
    private _minLines = 12;

    ngAfterViewInit() {
        ace.require('ace/ext/language_tools');
        const element = this.codeEditorElmRef.nativeElement;
        console.log('CodeEditor', element);
        const editorOptions = this.getEditorOptions();
        this.codeEditor = this.createCodeEditor(element, editorOptions);
        this.setContent(this.content || INIT_CONTENT);
        // hold reference to beautify extension
        this.editorBeautify = ace.require('ace/ext/beautify');
    }

    private getFontSize() {
        switch (this.mode) {
            case 'small':
                return 18;
            default:
                return 14;
        }
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
            minLines: this.minLines || 12,
            maxLines: Infinity,
            fontSize: this.getFontSize(),
        };
        const extraEditorOptions = { enableBasicAutocompletion: true };
        return Object.assign(basicEditorOptions, extraEditorOptions);
    }

    /**
     * @returns - the current editor's content.
     */
    public getContent() {
        if (this.codeEditor) {
            const code = this.codeEditor.getValue();
            return code;
        } else return;
    }

    /**
     * @param content - set as the editor's content.
     */
    public setContent(content: string): void {
        if (this.codeEditor) {
            this.codeEditor.setValue(content);
        }
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

    /**
     * @event OnContentChange - a proxy event to Ace 'change' event - adding additional data.
     * @param callback - recive the corrent content and 'change' event's original parameter.
     */
    public OnContentChange(callback: (content: string | undefined, delta: ace.Ace.Delta) => void): void {
        this.codeEditor?.on('change', (delta) => {
            const content = this.codeEditor?.getValue();
            callback(content, delta);
        });
    }
}
