function localStorage(){

	this._store = {}
  	this._keys  = []

	//setItem: Saves and item at the key provided.
    function setItem(key, value){

	}

    //key: Returns the name of the key at the position specified.
    function key(keyindex){
    	return keys[keyindex];
    }

    //getItem: Returns the item identified by it's key.
    function getItem(key){

	}
    
    //removeItem: Removes the item identified by it's key.
    function removeItem(key){

	}

    //clear: Removes all of the key value pairs.
    function clear(){

	}

}

exports.localStorage = localStorage;