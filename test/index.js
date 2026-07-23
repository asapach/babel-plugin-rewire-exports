import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { fileURLToPath } from 'url';
import { transformFileSync } from '@babel/core';
import { trim, fixtureFor } from './util.js';
import plugin from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
      const resolved = fixtureFor(outputPath);
      if (fs.existsSync(resolved)) {
        const expected = fs.readFileSync(resolved).toString();
        assert.strictEqual(trim(actual), trim(expected));
      } else {
        fs.writeFileSync(resolved, actual);
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
          { modules: false, targets: { ie: '11' } }
        ]],
        plugins: [plugin]
      };

      assertFixture(path.join(fixtureDir, 'es5.js'), options);
    });

    it(`should ${caseName.split('-').join(' ')} in CJS`, () => {
      const options = {
        babelrc: false,
        presets: [[
          '@babel/preset-env',
          { modules: 'commonjs', targets: { ie: '11' } }
        ]],
        plugins: [plugin]
      };

      assertFixture(path.join(fixtureDir, 'cjs.js'), options);
    });
  });
});
