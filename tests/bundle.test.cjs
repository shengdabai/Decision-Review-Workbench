'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('单文件入口内联脚本与源文件一致且语法有效', () => {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, '单文件入口.html'), 'utf8');
  const scripts = [...html.matchAll(/<script>\s*([\s\S]*?)<\/script>/g)];
  const sources = ['core.js', 'sample-data.js', 'app.js'];
  assert.equal(scripts.length, sources.length);
  sources.forEach((source, index) => {
    assert.equal(scripts[index][1].trim(), fs.readFileSync(path.join(root, source), 'utf8').trim(), source);
    assert.doesNotThrow(() => new vm.Script(scripts[index][1], { filename: source }));
  });
});
