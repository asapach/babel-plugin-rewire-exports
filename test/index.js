import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from '@babel/core';
import { trim } from './util';
import plugin from '../src';

describe('Plugin', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  fs.readdirSync(fixturesDir).map((caseName) => {
    it(`should ${caseName.split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const inputPath = path.join(fixtureDir, 'input.js');
      const options = {
        babelrc: false,
        plugins: [plugin]
      };

      const actual = transformFileSync(inputPath, options).code;
      const expected = fs.readFileSync(
        path.join(fixtureDir, 'output.js')
      ).toString();

      assert.equal(trim(actual), trim(expected));
    });
  });
});
