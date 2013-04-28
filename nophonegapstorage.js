function localStorage(){

	this._store = {}
  	this._keys  = []
}

//key: Returns the name of the key at the position specified.
localStorage.prototype.key = function (keyindex){
    	return keys[keyindex];
}

//setItem: Saves and item at the key provided.
localStorage.prototype.setItem = function (key, value){
    	this._keys.push(key)
		this._keys.sort()
		key = '$' + key // safety, to avoid key='__proto__'-type skullduggery 
		this._store[key] = value
}

//getItem: Returns the item identified by it's key.
localStorage.prototype.getItem = function (key){
    	return this._store['$' + key]
}

//removeItem: Removes the item identified by it's key.
localStorage.prototype.removeItem = function (key){
	delete this._store['$' + key]
}

    //clear: Removes all of the key value pairs.
localStorage.prototype.clear = function (){
	this._store = {};
  	this._keys  = [];	
}

localStorage.prototype.length = function(){
	return this._keys.length;
}

exports.localStorage = localStorage;