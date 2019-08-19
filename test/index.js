import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from '@babel/core';
import { trim } from './util';
import plugin from '../src';

describe('Plugin', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  const options = {
    babelrc: false,
    plugins: [plugin]
  };

  fs.readdirSync(fixturesDir).map((caseName) => {
    const fixtureDir = path.join(fixturesDir, caseName);
    const inputPath = path.join(fixtureDir, 'input.js');

    const assertFixture = (outputPath, options) => {
      const actual = transformFileSync(inputPath, options).code;
      if (fs.existsSync(outputPath)) {
        const expected = fs.readFileSync(outputPath).toString();
        assert.strictEqual(trim(actual), trim(expected));
      } else {
        fs.writeFileSync(outputPath, actual);
      }
    };

    it(`should ${caseName.split('-').join(' ')}`, () => {
      assertFixture(path.join(fixtureDir, 'output.js'), options);
    });

    it(`should ${caseName.split('-').join(' ')} in ES5`, () => {
      const options = {
        babelrc: false,
        presets: [[
          '@babel/preset-env',
          { modules: false }
        ]],
        plugins: [plugin]
      };

      assertFixture(path.join(fixtureDir, 'es5.js'), options);
    });

    it(`should ${caseName.split('-').join(' ')} in CJS`, () => {
      const options = {
        babelrc: false,
        presets: ['@babel/preset-env'],
        plugins: [plugin]
      };

      assertFixture(path.join(fixtureDir, 'cjs.js'), options);
    });
  });
});
