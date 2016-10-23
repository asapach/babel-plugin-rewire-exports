# babel-plugin-rewire-exports

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
