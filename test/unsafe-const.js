import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from '@babel/core';
import { trim } from './util.js';
import plugin from '../src/index.js';

describe('unsafeConst option', () => {
  const options = {
    babelrc: false,
    plugins: [[plugin, {
      unsafeConst: true
    }]]
  };

  it('should allow to rewire constants', () => {
    const actual = transformFileSync('./test/unsafe-const/input.js', options).code;
    const expected = fs.readFileSync('./test/unsafe-const/output.js').toString();

    assert.strictEqual(trim(actual), trim(expected));
  });

});
