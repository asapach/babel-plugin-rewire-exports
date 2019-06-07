import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from '@babel/core';
import { trim } from './util';
import plugin from '../src';

describe('unsafeConst option', () => {
  const options = {
    babelrc: false,
    plugins: [[plugin, {
      unsafeConst: true
    }]]
  };

  it('should allow to rewire constants', () => {
    const actual = transformFileSync('./test/unsafe-const/actual.js', options).code;
    const expected = fs.readFileSync('./test/unsafe-const/expected.js').toString();

    assert.equal(trim(actual), trim(expected));
  });

});
