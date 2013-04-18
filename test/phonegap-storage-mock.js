var openDatabase = function(database_name, database_version, database_displayname, database_size) {  
//.openDatabase(database_name, database_version, database_displayname, database_size);
	var db = {}
	console.log("openDatabase");
	db.message = "OK";
	return db;
};

exports.openDatabase = openDatabase;


