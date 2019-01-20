const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// ACCEPTING HEADERS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if(req.method === "OPTIONS"){
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		return res.status(200).json({});
	}
	next();
});

// BODY-PARSER CONFIG
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// => Routers src course
const course = require("./Routes/courseRoute");
//=> route category
const category = require("./Routes/categoryRoute");
//=> route task
const task = require("./Routes/taskRoute");

app.use("/api/course", course);
app.use("/api/category", category);
app.use("/api/task", task);

module.exports = app;