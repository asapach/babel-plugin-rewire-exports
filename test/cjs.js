import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from '@babel/core';
import { trim } from './util';
import plugin from '../src';

describe('cjs modules should work', () => {
  it('when plugin is first', () => {
    const options = {
      babelrc: false,
      plugins: [plugin, '@babel/plugin-transform-modules-commonjs']
    };

    const actual = transformFileSync('./test/cjs/actual.js', options).code;
    const expected = fs.readFileSync('./test/cjs/expected.js').toString();

    assert.equal(trim(actual), trim(expected));
  });

  it('when using es2015 preset', () => {
    const options = {
      babelrc: false,
      presets: ['@babel/preset-es2015'],
      plugins: [plugin]
    };

    const actual = transformFileSync('./test/cjs/actual.js', options).code;
    const expected = fs.readFileSync('./test/cjs/expected.js').toString();

    assert.equal(trim(actual), trim(expected));
  });

  it('when using env preset', () => {
    const options = {
      plugins: [plugin]
    };

    const actual = transformFileSync('./test/cjs/actual.js', options).code;
    const expected = fs.readFileSync('./test/cjs/expected.js').toString();

    assert.equal(trim(actual), trim(expected));
  });
});
