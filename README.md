# Babel-plugin-console-source
Prepends file name and line numbers for each console command, based on the source files.

````javascript
// app.js
class App() {
    constructor() {
        console.log('test')
    }
}
↓ ↓ ↓ ↓ ↓ ↓
class App() {
    constructor() {
        console.log('app.js (3:8)', 'test')
    }
}

// test.js
class Test() {
    constructor() {
        console.log('test two')
    }
}
↓ ↓ ↓ ↓ ↓ ↓
class Test() {
    constructor() {
        console.log('test.js (3:8)', 'test two')
    }
}
````



### Usage

````bash
$ yarn add babel-plugin-console-source -D
````

.babelrc
````json
{
  "plugins": [
    "console-source"
  ]
}

````