'use strict';

import { window, TextEditor, Range, Position, TextLine } from 'vscode';

export default function(text: string, editor?: TextEditor): Thenable<boolean> {
	editor = editor || window.activeTextEditor;

	if (!editor) {
		return Promise.resolve(null);
	}

	return editor.edit(builder => {
		const document = editor.document;
		let lastLineIndex = document.lineCount - 1;
		let lastLine: TextLine;

		do {
			lastLine = document.lineAt(lastLineIndex--)
		} while (lastLine.isEmptyOrWhitespace && lastLineIndex > 0)

		const start = new Position(0, 0);
		const end = new Position(document.lineCount - 1, lastLine.text.length);

		builder.replace(new Range(start, end), text);
	});
}
