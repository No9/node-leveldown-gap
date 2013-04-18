var openDatabase = function(database_name, database_version, database_displayname, database_size) {  
	var db = {}
	console.log("openDatabase");

	return db;
};

var transaction = function (populateDB, errorCB, successCB){
	if(populateDB.name == "createDB"){
		console.log("Database Created");
	}
}

exports.openDatabase = openDatabase;
exports.transaction = transaction;


