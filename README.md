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
        
        // consoleSource // No options required
        
        // You can pass in the following options
        ["console-source", {
        
            "segments": 1, // NOT REQUIRED
            // 0 = full file path (Default)
            // 1 = file name ONLY
            // 2 = file name and last segment
            
            "splitSegment": '/' // How to split the path - NOT REQUIRED
            // Default is / for Linux and OSX
            // Windows users can use "\\" here if needed
             
        }]
    ]
}
````

### Notes

NPM Install: https://www.npmjs.com/package/babel-plugin-console-source
