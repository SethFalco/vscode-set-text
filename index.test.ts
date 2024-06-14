import * as assert from 'assert';

import { Position, commands, window } from 'vscode';
import fn from './index';

suite('Extension Test Suite', () => {
  suiteTeardown(() => {
    window.showInformationMessage('All tests done!');
  });

  test('should do nothing for empty document', async () => {
		await commands.executeCommand('workbench.action.files.newUntitledFile');
		await fn('');
		const editorBody = window.activeTextEditor.document.getText();

		assert.strictEqual(editorBody, '');
  });

	test('should replace text with goodbye', async () => {
		await commands.executeCommand("workbench.action.files.newUntitledFile");
		await window.activeTextEditor.edit(builder => builder.insert(
			new Position(0, 0),
			`Hello, World!`
		));
		await fn('Goodbye, World!');
		const editorBody = window.activeTextEditor.document.getText();

		assert.strictEqual(editorBody, 'Goodbye, World!');
  });

	test('should replace text with goodbye, with trailing line break', async () => {
		await commands.executeCommand("workbench.action.files.newUntitledFile");
		await window.activeTextEditor.edit(builder => builder.insert(
			new Position(0, 0),
			`Hello, World!\n`
		));
		await fn('Goodbye, World!');
		const editorBody = window.activeTextEditor.document.getText();

		assert.strictEqual(editorBody, 'Goodbye, World!');
  });
});
