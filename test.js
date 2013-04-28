var tape   = require('tape')
  , leveldown = require('./')
  , factory = function (location) {
  		
      return new leveldown(location)  
    }
  , testCommon = require('./testCommon')
  , testBuffer = new Uint8Array(1)

testBuffer[0] = '☃'
console.dir(factory);

require('abstract-leveldown/abstract/leveldown-test').args(factory, tape)
require('abstract-leveldown/abstract/open-test').args(factory, tape, testCommon)
require('abstract-leveldown/abstract/del-test').all(factory, tape, testCommon)
require('abstract-leveldown/abstract/put-test').all(factory, tape, testCommon)
require('abstract-leveldown/abstract/get-test').all(factory, tape, testCommon)
require('abstract-leveldown/abstract/put-get-del-test').all(factory, tape, testCommon, testBuffer)
require('abstract-leveldown/abstract/close-test').close(factory, tape, testCommon)
//require('abstract-leveldown/abstract/iterator-test').all(factory, tape, testCommon)