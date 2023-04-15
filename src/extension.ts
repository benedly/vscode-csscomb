import * as vscode from 'vscode';
import * as fs from 'fs';

const csscomb = require('csscomb');
const config: any = {};
config.compress = require('./compress.json');
config.compact = require('./compact.json');
config.expand = require('./expand.json');

const execute = (type: string) => () => {
  // vscode.window.showInformationMessage(type);
  if (!vscode.window.activeTextEditor) {
    return null;
  }

  let f = vscode.window.activeTextEditor.document.uri.fsPath;
  const comb = new csscomb(config[type]);
  comb.processPath(f);
  // vscode.window.showInformationMessage(`success csscomb(${type})`);
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerTextEditorCommand('csscomb.compress', execute('compress')));
  context.subscriptions.push(vscode.commands.registerTextEditorCommand('csscomb.compact', execute('compact')));
  context.subscriptions.push(vscode.commands.registerTextEditorCommand('csscomb.expand', execute('expand')));
}

// This method is called when your extension is deactivated
export function deactivate() {}
