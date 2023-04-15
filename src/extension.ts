import * as vscode from 'vscode';
import * as fs from 'fs';

const csscomb = require('csscomb');
const compress = require('./compress.json');
const compact = require('./compact.json');
const expand = require('./expand.json');

const execute = (config: object) => () => {
  // vscode.window.showInformationMessage(type);
  if (!vscode.window.activeTextEditor) {
    return null;
  }

  let f = vscode.window.activeTextEditor.document.uri.fsPath;
  const comb = new csscomb(config);
  comb.processPath(f);
  vscode.window.showInformationMessage('success csscomb');
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerTextEditorCommand('csscomb.compress', execute(compress)));
  context.subscriptions.push(vscode.commands.registerTextEditorCommand('csscomb.compact', execute(compact)));
  context.subscriptions.push(vscode.commands.registerTextEditorCommand('csscomb.expand', execute(expand)));
}

// This method is called when your extension is deactivated
// export function deactivate() {}
