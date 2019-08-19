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

  const assertIssue = (id, options) => {
    const actual = transformFileSync(`./test/issues/${id}/input.js`, options).code;
    const expected = fs.readFileSync(`./test/issues/${id}/output.js`).toString();

    assert.strictEqual(trim(actual), trim(expected));
  };

  it('#1 undefined wire', () => {
    assertIssue(1, options);
  });

  it('#5 Explicit re-export is not working', () => {
    assertIssue(5, options);
  });

  it('#6 Fail to rewire named exported constant functions', () => {
    const options = {
      babelrc: false,
      plugins: [[plugin, {
        unsafeConst: true
      }]]
    };
    assertIssue(6, options);
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
    assertIssue(13, options);
  });

  it('#15 Problem trying to rewire function within same file', () => {
    const options = {
      babelrc: false,
      plugins: [[plugin, {
        unsafeConst: true
      }]]
    };
    assertIssue(15, options);
  });

  it('#19 Duplicate exports in es5', () => {
    const options = {
      babelrc: false,
      presets: [[
        '@babel/preset-env',
        { modules: false }
      ]],
      plugins: [plugin]
    };
    assertIssue(19, options);
  });

  it('#20 export functional components', () => {
    const options = {
      babelrc: false,
      presets: [[
        '@babel/preset-env',
        { modules: false }
      ]],
      plugins: [plugin]
    };
    assertIssue(20, options);
  });
});
