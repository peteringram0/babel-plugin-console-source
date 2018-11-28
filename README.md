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
````javascript
{
    "plugins": [
        ["console-source", {
        
            "segments": 1
            // 0 = full file path (Default)
            // 1 = file name ONLY
            // 2 = file name and last segment
            
        }]
    ]
}
````

### Notes

NPM Install: https://www.npmjs.com/package/babel-plugin-console-source
