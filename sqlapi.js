exports.leveldown = function(location){
	 level = {};
	 var db = {};

	 if (typeof module !== 'undefined' && module.exports) {
            db = require('./test/phonegap-storage-mock.js');
    } else {
            db = window;
    }

    level.open = function(){
        var cb;

        switch(arguments.length){
            case 0 :
                throw new Error("open() requires a callback argument");
            break;
            case 1 :
                if(typeof arguments[0] != 'function')        
                    throw new Error("open() requires a callback argument");
                else
                    cb = arguments[0]
            break;  

            case 2 :

                if(typeof arguments[0] != 'object'){
                    throw new Error("1st arg should be an object");                    
                }

                if(typeof arguments[1] != 'function')       {
                    throw new Error("2nd argument should be a function");
                }else{

                    // We are ok so parse the options
                    // I am throwing if the user is trying to manage the database as this is not 
                    // possible Phonegap Datastore
                    if(arguments[0].errorIfExists){
                        cb = arguments[1];
                        var errExists = new Cerror();
                        errExists.message = "exists";
                        cb(errExists);
                        return;
                    }

                    if(arguments[0].createIfMissing == false){
                        cb = arguments[1];
                        var errMissing = new Cerror(); 
                        errMissing.message = "does not exist";
                        cb(errMissing);
                        return;
                    }else{
                        cb = arguments[1]
                    }
                }
            break;
        }
        cb();
    	return db.openDatabase("database_name","database_version", "database_displayname", 100000);
    	
    }

    level.close = function(){
        var cb;
        switch(arguments.length){
            case 0 :
                 throw new Error("close() requires a callback argument");
            break;
            case 1 :
                if(typeof arguments[0] != 'function')        
                    throw new Error("close() requires a callback argument");
                else
                    cb = arguments[0]
            break;  
        }
    	cb();
    }

    level.get = function(){
        var cb;
        var retval = {}
        var isbuffer = true;
        var err = {};
        switch(arguments.length){
            case 0 :
                 throw new Error("get() requires a callback argument");
            break;
            case 1 :
                if(typeof arguments[0] != 'function')        
                    throw new Error("get() requires a callback argument");
                else
                    cb = arguments[0]
            break;  
            case 2 :
                if(typeof arguments[1] != 'function')       
                    throw new Error("get() requires a callback argument");
                else
                    cb = arguments[1]
                break;
                
            case 3 :
                if(typeof arguments[2] != 'function')       
                  throw new Error("get() requires a callback argument");
                else
                    cb = arguments[2]    
                //Parse options    
                if(arguments[1].asBuffer == false)
                    isbuffer = false; 
            break;
        }


        //Get the data for argurments[0]
        //call the callback with that data.
        //if there is an error pass it into the callback

        if(isbuffer)
            retval = new Buffer('bar');
        else
            retval = 'bar';

        cb(null, retval);
    }
    
    level.put = function(){
        var cb;
        switch(arguments.length){
            case 0 :
                 throw new Error("put() requires a callback argument");
            break;
            case 1 :
                if(typeof arguments[0] != 'function')        
                    throw new Error("put() requires a callback argument");
                else
                    cb = arguments[0]
            break;  
            case 2 :
                if(typeof arguments[1] != 'function')       
                    throw new Error("put() requires a callback argument");
                else
                    cb = arguments[1];
            break;
            case 3 :
                if(typeof arguments[2] != 'function')       
                    throw new Error("put() requires a callback argument");
                else
                    cb = arguments[2];
            break;
        }
        cb();
    }

    return level;

    function Cerror() 
    {
        this.message = "";
    }
 
// toString override added to prototype of Foo class
    Cerror.prototype.toString = function()
    {
        return "error";
    }
}

