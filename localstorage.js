function localStorage(){
	this._keys  = [];

	for (var i = 0; i < window.localStorage.length; i++){
    	this._keys.push(window.localStorage.key(i))
    }
    this._keys.sort();

}

//key: Returns the name of the key at the position specified.
localStorage.prototype.key = function (keyindex){
		return this._keys[keyindex];
}

//setItem: Saves and item at the key provided.
localStorage.prototype.setItem = function (key, value){    	
    	this._keys.push(key)
		this._keys.sort()
		window.localStorage.setItem(key, value)
}

//getItem: Returns the item identified by it's key.
localStorage.prototype.getItem = function (key){
		var retval = window.localStorage.getItem(key) 
    	if(retval == null){
    		retval = undefined;
    	}
    	return retval;
}

//removeItem: Removes the item identified by it's key.
localStorage.prototype.removeItem = function (key){
	window.localStorage.removeItem(key)
}

    //clear: Removes all of the key value pairs.
localStorage.prototype.clear = function (){
	window.localStorage.clear()
}

localStorage.prototype.length = function(){
	return window.localStorage.length
}

exports.localStorage = localStorage;