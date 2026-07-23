import fs from 'fs';
import { version } from '@babel/core';

export const babelMajor = parseInt(version, 10);

// Preset-combined fixtures (preset-env / preset-react output) are committed as Babel 8 output.
// A few differ on Babel 7 (e.g. `exports.default` vs `exports["default"]`, helper formatting,
// JSX dev transform). For those, a sibling `<name>.babel7.js` fixture holds the Babel 7 output;
// on Babel 7 we prefer it, otherwise we fall back to the shared (Babel 8) fixture.
export function fixtureFor(outputPath) {
  if (babelMajor < 8) {
    const variant = outputPath.replace(/\.js$/, '.babel7.js');
    if (fs.existsSync(variant)) return variant;
  }
  return outputPath;
}

export function trim(str) {
  return str.replace(/\r\n/g, '\n').replace(/^\s+|\s+$/, '');
}
