var openDatabase = function(database_name, database_version, database_displayname, database_size) {  
	var db = {}
	console.log("openDatabase");
	return db;
};

function tx (){
	this.executeSql = function(sql, params, success, error){
			var id = {};
			var results = {};
			results.data = 'bar';
			success(id, results)	
	}
}

var transaction = function (populateDB, errorCB, successCB){
	
	if(populateDB.name == "createDB"){
		console.log("Database Created");
	}else{
		var stmt = new tx();
		populateDB(stmt);
	}
}

exports.openDatabase = openDatabase;
exports.transaction = transaction;