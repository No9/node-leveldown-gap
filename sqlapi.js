exports.leveldown = function(location){
	 var level = {};
	 var db = {};
     var dbdetails = "default";
     // Use the last item in the path as the database name 
     var paths = location.split('/');
        if(paths.length == 1){
            paths = location.split('\\');
        }

        if(paths.length > 1)
        {
            dbdetails = paths.pop();                
        }
        
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
        
        //Parse out for windows tests
        db.openDatabase(dbdetails,dbdetails, dbdetails, 100000);
        db.transaction(createDB, function(){ throw new Error('Create DB Failed')})
        //return retval;
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
        var id = "";
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
                    id = arguments[0]; 
            break;
        }

        //Get the data for argurments[0]
        //call the callback with that data.
        //if there is an error pass it into the callback
        db.transaction(
            function(tx){ 
                getData(tx, id, function(tx, results){
                                var retval;
                                if(isbuffer)
                                    retval = new Buffer(results.data);
                                else
                                    retval = results.data;
                            
                            cb(null, retval); 
                        }, function(){ throw new Error('Get Failed'); })
            })
        
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

    function GuidManager(){
        var tmp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

        this.id = tmp;

    }

    function createDB(tx) {
         tx.executeSql('CREATE TABLE IF NOT EXISTS LEVELTABLE (id unique, data)');
    }

    function getData(tx, id, querySuccess, errorCB){
        tx.executeSql('SELECT * FROM LEVELTABLE WHERE id = ?', [id], querySuccess, errorCB);
    }
}

