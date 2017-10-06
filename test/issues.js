import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from 'babel-core';
import { trim } from './util';
import plugin from '../src';

describe('issues', () => {
  it('#1 undefined wire', () => {
      const options = {
        babelrc: false,
        presets: ['es2015'],
        plugins: [plugin]
      };

      const actual = transformFileSync('./test/issues/1/actual.js', options).code;
      const expected = fs.readFileSync('./test/issues/1/expected.js').toString();

      assert.equal(trim(actual), trim(expected));
  });
});
