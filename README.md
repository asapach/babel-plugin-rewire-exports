# babel-plugin-rewire-exports

Babel plugin for stubbing module exports. It allows to rewire the the exported values in all the importing modules.
Unlike [babel-plugin-rewire](https://github.com/speedskater/babel-plugin-rewire) it doesn't modify the module
internals (e.g. imports and top-level variables and functions). See [How it works](#how-it-works) section for implementation details.

## Exports
Plugin transforms module exports in such a way that they can be stubbed (or "rewired") via an API:
* default export - plugin exports additional `rewire(stub)` function that allows to replace the original
* named exports - for each export (e.g. `export var foo`) an additional function `rewire$foo(stub)` is exported
* `restore()` function allows to restore the exports to their original values

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

describe('adapter', function () {
  beforeEach(function () {
    rewire(this.spy = jasmine.createSpy('fetch'))
  })
  afterAll(restore)
  
  it('should call fetch', function () {
    fetchItems()
    expect(this.spy.toHaveBeenCalledWith('/items'))
  })
})
```

## Compatibility
* :heart: Should work in modern browsers once they start implementing ES6 modules natively - for example tested in latest Edge with [experimental flags](https://blogs.windows.com/msedgedev/2016/05/17/es6-modules-and-beyond/)
* :sparkles: SystemJS
* :star2: Webpack 2
* :bug: Rollup doesn't support rewiring default exports
* :hankey: CommonJS and AMD will only work if you use `import * as ...` notation consistently

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

TODO: implementation details

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
