const { Pool } = require("pg"); // import Node Postgresql lib


// this will send query to database and return error or response  
const query = (query, info, callback) => {

	//Pool setting to the database we put database info to tell to Pool setting which table and schema we are going to use
	// look at config/development to see infs which stored as development variable
	const pool = new Pool({
		user: "postgres",
		host: info.host,
		port: info.port,
		password: info.password,
		database: info.database,
		schema: info.schema,
	});

	pool.query(query, (err, res) => {
		callback(err, res)
	})
};


module.exports = {
	query
}