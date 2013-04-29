# node-leveldown-gap

A leveldown implementation for Phonegap the idea is to be able to use the sync technology in the level stack on a phone.
There are a couple of scenarios.
1. Occasionally connected clients
2. Adhoc Networks where clients need to sync with each other.  


## Install 

```
	git clone git@github.com:No9/node-leveldown-gap.git
```
## Test 

```
	beefy test
```
Browse to http://localhost:9966/ 
View console logs in the browser to see test output. 

## Status 
Tested against a mock in-memory service implementation using browserify and tape. 
All tests pass. 


## TODO
Implement integration tests for phonegap  

## License

(The MIT License)

Copyright (c) 2013 Anthony Whalley

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
