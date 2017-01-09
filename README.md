# babel-plugin-rewire-exports

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]

Babel plugin for stubbing (ES6, ES2015) module exports.
It allows to rewire the the exported values in all the importing modules.
Unlike [babel-plugin-rewire](https://github.com/speedskater/babel-plugin-rewire) it doesn't modify the module
internals (e.g. imports and top-level variables and functions).
See [How it works](#how-it-works) section for implementation details.

## Exports
Plugin transforms module exports in such a way that they can be stubbed (or "rewired") via the following API:
* default export - plugin exports additional `rewire(stub)` function that allows to replace the original
* named exports - for each export (e.g. `export var foo`) an additional function `rewire$foo(stub)` is exported
* `restore()` function allows to restore the exports to their original values
* if there are existing `rewire` or `restore` top-level identifiers, the generated exports will be named
`rewire$default` and `restore$rewire` respectively

### Example

Named export:
```js
//------ text.js ------
export let message = 'Hello world!'

//------ logger.js ------
import {message} from './text.js'

export default function () {
  console.log(message)
}

//------ main.js ------
import {rewire$message, restore} from './text.js'
import logger from './logger.js'

logger() // 'Hello world!'
rewire$message('I am now rewired')
logger() // 'I am now rewired'
restore()
logger() // 'Hello world!'
```

Default export:
```js
//------ fetch.js ------
export default function (url) {
  // perform some expensive remote call
}

//------ adapter.js ------
import fetch from './fetch.js'

export function fetchItems() {
  return fetch('/items')
}

//------ test.js ------
import {rewire, restore} from './fetch.js'
import {fetchItems} from './adapter.js'

// Jasmine example
describe('adapter', function () {
  beforeEach(function () {
    rewire(this.spy = jasmine.createSpy('fetch'))
  })
  afterAll(restore)
  
  it('should call fetch', function () {
    fetchItems()
    expect(this.spy).toHaveBeenCalledWith('/items')
  })
})

// Mocha/Chai and Sinon example
describe('adapter', function () {
  var spy

  beforeEach(function () {
    rewire(spy = sinon.spy())
  })
  after(restore)
  
  it('should call fetch', function () {
    fetchItems()
    expect(spy.withArgs('/items').calledOnce).to.be.true
  })
})
```

## Compatibility
* :heart: Should work in modern browsers and Node once they start implementing ES6 modules natively - for example tested in latest Edge with [experimental flags](https://blogs.windows.com/msedgedev/2016/05/17/es6-modules-and-beyond/)
* :sparkles: SystemJS
* :star2: Webpack 2
* :boom: Rollup - requires [v0.38+](https://github.com/rollup/rollup/blob/master/CHANGELOG.md#0380)
* :package: Seems to work with CommonJS and AMD (including bundling with webpack)

## How it works
[In ES6, imports are live read-only views on exported values](
http://exploringjs.com/es6/ch_modules.html#_in-es6-imports-are-live-read-only-views-on-exported-values):

```js
//------ lib.js ------
export let counter = 3;
export function incCounter() {
    counter++;
}

//------ main1.js ------
import { counter, incCounter } from './lib';

// The imported value `counter` is live
console.log(counter); // 3
incCounter();
console.log(counter); // 4

// The imported value can’t be changed
counter++; // TypeError
```

This allows for any exports to be overwritten from within the module -
and imports will be automatically updated via their bindings.

### Transformations
Here's how various kinds of export declarations are transformed:
* Literals (`export default 'foo'`) - the original value is copied to a variable to be stubbed and restored later:
  `export {_default as default}`
* Variables:
  - named exports (`export var foo`, `export let bar` or `export {baz}`) are left intact,
    but their initial values are similarly copied to temp variables.
  - default export (`export default foo`) is converted to a named export to enable live binding:
    `export {foo as default}`
* Constants (`export const foo = 'bar'`) are ignored
* Functions (`export default function () {…}` or `export function foo() {…}`)
  are split into a function declaration and exported variable by the same name.
  The variable is hoisted to the very top of the module to preserve existing behavior.
* Classes (`export default class {…}` or `export class foo {…}`) are handled similar to functions
  except the variables are not hoisted (again to preserve the existing behavior).
* Re-exports (`export * from './foo.js'` or `export {bar} from 'baz'`) are ignored

## Installation

```sh
$ npm install babel-plugin-rewire-exports
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```javascript
{
  "plugins": ["rewire-exports"]
}
```

### Via CLI

```sh
$ babel --plugins rewire-exports script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["rewire-exports"]
});
```

[npm-image]: https://img.shields.io/npm/v/babel-plugin-rewire-exports.svg?style=flat
[npm-url]: https://npmjs.org/package/babel-plugin-rewire-exports
[travis-image]: https://img.shields.io/travis/asapach/babel-plugin-rewire-exports.svg?style=flat
[travis-url]: https://travis-ci.org/asapach/babel-plugin-rewire-exports
[downloads-image]: https://img.shields.io/npm/dm/babel-plugin-rewire-exports.svg?style=flat
[downloads-url]: https://npmjs.org/package/babel-plugin-rewire-exports
