var util              = require('util')
  , AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN
  , AbstractIterator  = require('abstract-leveldown').AbstractIterator
  , checkKeyValue     = require('abstract-leveldown').checkKeyValue
  , noop              = function () {}
  , setImmediate      = global.setImmediate || process.nextTick

function ldgapIterator (db, options) {
  AbstractIterator.call(this, db)
  this._reverse = !!options.reverse
  this._end     = options.end
  this._limit   = options.limit
  this._count   = 0

  if (options.start) {
    for (var i = 0; i < this.db.container.length; i++) {
      if (this.db.container.key(i) >= options.start) {
        this._pos = i
        break
      }
    }
  } else {
    this._pos = this._reverse ? this.db.container.length - 1 : 0
  }

  console.dir("CALLED ldgapIterator")
}

util.inherits(ldgapIterator, AbstractIterator)

ldgapIterator.prototype._next = function (callback) {
	
  if (this._pos >= this.db.container.length || this._pos < 0)
    return setImmediate(callback)
  var key   = this.db.container.key(this._pos)
    , value

  if (!!this._end && (this._reverse ? key < this._end : key > this._end))
    return setImmediate(callback)


  if (!!this._limit && this._limit > 0 && this._count++ >= this._limit)
    return setImmediate(callback)

  value = this.db.container.getItem(key) 
  this._pos += this._reverse ? -1 : 1

  setImmediate(callback.bind(null, null, key, value))
}

function ldgap (location) {
  AbstractLevelDOWN.call(this, location)

  if (typeof module !== 'undefined' && module.exports) {
  			  
            			var store = require('./nophonegapstorage').localStorage; 
			this.container = new store();

    } else {
    	
    	if(window.PhoneGap){
		
			this.container = window.localStorage;
		
		}else{
			var store = require('./nophonegapstorage').localStorage; 
			this.container = new store();
		
		}
            
    }
}		

util.inherits(ldgap, AbstractLevelDOWN)

ldgap.prototype._open = function (options, callback) {
  setImmediate(function () { callback(null, this) }.bind(this))
}

ldgap.prototype._put = function (key, value, options, callback) {
  this.container.setItem(key, value);  
  setImmediate(callback)
}

ldgap.prototype._get = function (key, options, callback) {
  
  var value = this.container.getItem(key);
  if (value === undefined) {
    // 'NotFound' error, consistent with LevelDOWN API
    return setImmediate(function () { callback(new Error('NotFound')) })
  }
  if (options.asBuffer !== false && !Buffer.isBuffer(value))
    value = new Buffer(String(value))
  setImmediate(function () {
    callback(null, value)
  })
}

ldgap.prototype._del = function (key, options, callback) {
  for (var i = 0; i < this.container.length; i++) {
    if (this._keys[i] == key) {
      this._keys.splice(i, 1)
      break;
    }
  }

  this.container.removeItem(key); 
  setImmediate(callback)
}

ldgap.prototype._batch = function (array, options, callback) {
  var err
    , i = 0
  if (Array.isArray(array)) {
    for (; i < array.length; i++) {
      if (array[i]) {
        key = Buffer.isBuffer(array[i].key) ? array[i].key : String(array[i].key)
        err = checkKeyValue(key, 'key')
        if (err) return setImmediate(callback.bind(null, err))
        if (array[i].type === 'del') {
          this._del(array[i].key, options, noop)
        } else if (array[i].type === 'put') {
          value = Buffer.isBuffer(array[i].value) ? array[i].value : String(array[i].value)
          err = checkKeyValue(value, 'value')
          if (err) return setImmediate(callback.bind(null, err))
          this._put(key, value, options, noop)
        }
      }
    }
  }
  setImmediate(callback)
}

ldgap.prototype._iterator = function (options) {
  return new ldgapIterator(this, options)
}

module.exports = ldgap