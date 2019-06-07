import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from '@babel/core';
import { trim } from './util';
import plugin from '../src';

describe('issues', () => {
  const options = {
    babelrc: false,
    presets: ['@babel/preset-env'],
    plugins: [plugin]
  };

  it('#1 undefined wire', () => {
    const actual = transformFileSync('./test/issues/1/actual.js', options).code;
    const expected = fs.readFileSync('./test/issues/1/expected.js').toString();

    assert.equal(trim(actual), trim(expected));
  });

  it('#5 Explicit re-export is not working', () => {
    const actual = transformFileSync('./test/issues/5/actual.js', options).code;
    const expected = fs.readFileSync('./test/issues/5/expected.js').toString();

    assert.equal(trim(actual), trim(expected));
  });

  it('#6 Fail to rewire named exported constant functions', () => {
    const options = {
      babelrc: false,
      plugins: [[plugin, {
        unsafeConst: true
      }]]
    };
    const actual = transformFileSync('./test/issues/6/actual.js', options).code;
    const expected = fs.readFileSync('./test/issues/6/expected.js').toString();

    assert.equal(trim(actual), trim(expected));
  });

  it('#13 Wrong names are exported', () => {
    const options = {
      babelrc: false,
      presets: [[
        '@babel/preset-env',
        { modules: false }
      ]],
      plugins: [plugin]
    };
    const actual = transformFileSync('./test/issues/13/actual.js', options).code;
    const expected = fs.readFileSync('./test/issues/13/expected.js').toString();

    assert.equal(trim(actual), trim(expected));
  });

  it('#15 Problem trying to rewire function within same file', () => {
    const options = {
      babelrc: false,
      plugins: [[plugin, {
        unsafeConst: true
      }]]
    };
    const actual = transformFileSync('./test/issues/15/actual.js', options).code;
    const expected = fs.readFileSync('./test/issues/15/expected.js').toString();

    assert.equal(trim(actual), trim(expected));
  });
});
