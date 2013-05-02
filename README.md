# node-leveldown-gap

A leveldown implementation for Phonegap and the browser.
The idea is to be able to use the sync technology in the level stack on a phone.

The scenarios envisaged are : 

1. Occasionally connected clients

2. Adhoc Networks where clients need to sync directly with each other.  

This project is standalone but fits well with [fija](https://github.com/No9/fija) and [levelup](https://github.com/rvagg/node-levelup)

## Status 

[![browser support](https://ci.testling.com/no9/node-leveldown-gap.png)](https://ci.testling.com/no9/node-leveldown-gap)

## Install

```
	npm install leveldown-gap
```

## Example 

At the command prompt in your chosen directory : 

```
npm install leveldown-gap 
npm install levelup 
npm install beefy -g
npm install browserify -g
```

Create a file called index.js and enter the following:

```
var leveldowngap = require('leveldown-gap')
  , levelup = require('levelup')
  , factory = function (location) { return new leveldowngap(location) }
  , db = levelup('/does/not/matter', { db: factory })

db.put('name', 'Yuri Irsenovich Kim')
db.put('dob', '16 February 1941')
db.put('spouse', 'Kim Young-sook')
db.put('occupation', 'Clown')

db.readStream()
   .on('data', function (data) {
      if(typeof data.value !== 'undefined') 
         console.log(data.key, '=', data.value)
   })
   .on('error', function (err) {
      console.log('Oh my!', err)
   })
   .on('close', function () {
      console.log('Stream closed')
   })
   .on('end', function () {
     console.log('Stream ended')
   })
```

Publish the site :

```
beefy index.js
```

See the output :

(http://localhost:9966)[http://localhost:9966]

Listen to John Cage :

http://www.youtube.com/watch?v=ExUosomc8Uc 

## Tests

```
	beefy tests/test
```

Browse to http://localhost:9966/ 
View console logs in the browser to see test output. 

## License

(The MIT License)

Copyright (c) 2013 Anthony Whalley

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
