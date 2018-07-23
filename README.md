# Babel-plugin-console-source
Prepends file name and line numbers for each console command, based on the source files.

##### Before
````javascript
// app.js
class App() {
    constructor() {
        console.log('test')
    }
}

// test.js
class Test() {
    constructor() {
        console.log('test two')
    }
}
````

##### After
````javascript
// app.js
class App() {
    constructor() {
        console.log('app.js (3:8) test')
    }
}

// test.js
class Test() {
    constructor() {
        console.log('test.js (3:8) test two')
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



##### Notes

Inspired by babel-plugin-captains-log https://www.npmjs.com/package/babel-plugin-captains-log