const db = require("../db");
const config = require("../config/index");

exports._getAllCourses = (req, res) => {
	const info = config.db; 
	const includeTasks = req.query.includeTasks;

	let query;
	if(includeTasks){
		query = `SELECT ${info.schema}."Courses"."CourseID", "Course", "TaskID" FROM ${info.schema}."Courses"
		LEFT JOIN ${info.schema}."Courses_Tasks"
		ON ${info.schema}."Courses"."CourseID" = ${info.schema}."Courses_Tasks"."CourseID"`;
	}
	else{
		query = `SELECT * FROM ${info.schema}."Courses"`;
	}

	db.query(query, info, (err, result) => {
		if (err) {
			return res.status(404).json(err);
		}

		let courses = result.rows;

		if(includeTasks){
			let courseRegister = {};
			courses.forEach(c => {
				if(!(c.CourseID in courseRegister)){
					courseRegister[c.CourseID] = {
						Course: c.Course,
						Tasks: []
					};
				}
				if(c.TaskID)
					courseRegister[c.CourseID].Tasks.push(c.TaskID);
			});

			courses = [];
			Object.keys(courseRegister).forEach(courseID => {
				courses.push({
					CourseID: courseID,
					Course: courseRegister[courseID].Course,
					Tasks: courseRegister[courseID].Tasks
				});
			});
		}
			
		return res.status(200).json(courses);
	});
};

exports._getCourse = (req, res) => {
	const info = config.db;
	const   { id } = req.params;

	db.query(`SELECT * FROM ${info.schema}."Courses" WHERE "CourseID"= ${id}`, info, (err, result) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(202).json(result.rows[0]);
	});
};

exports._addNewCourse = (req, res) => {
	const info = config.db;
	const { course } = req.body;

	// in order to let the id  generate itself i used Default in id field then i added the varibles in other field
	// Command form  INSERT INTO schemaName.tableName VALUES(id, course, studentNr, examPassedNr )
	db.query(`
	INSERT INTO ${info.schema}."Courses" VALUES( DEFAULT, '${course}' )
	RETURNING "Courses"."CourseID"`, info, (err, result) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json(result.rows[0]);
	});
};

exports._editCourse = (req, res) => {
	const info = config.db;
	const { id } = req.params; 
	const { course } = req.body;

	// Command form UPDATE schemaName.tableName SET columName='edite here' WHERE id=id number;
	db.query(`UPDATE ${info.schema}."Courses" SET "Course"='${course}' WHERE "CourseID"=${id}`, info, (err) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json({Message: "the course has been edited successfully"});
	});
};

exports._deleteCourse = (req, res) => {
	const info = config.db;
	const { id } = req.params; 

	db.query(`
	DELETE FROM ${info.schema}."Courses" WHERE "CourseID" = ${id};

	DELETE FROM ${info.schema}."Tasks" T USING ${info.schema}."Courses_Tasks" CT
	WHERE CT."CourseID"=${id} AND CT."TaskID"=T."TaskID";

	DELETE FROM ${info.schema}."Courses_Tasks" WHERE "CourseID"=${id};

	DELETE FROM ${info.schema}."Categories" C USING ${info.schema}."Courses_Categories" CC
	WHERE CC."CourseID"=${id} AND CC."CategoryID"=C."CategoryID";

	DELETE FROM ${info.schema}."Courses_Categories" WHERE "CourseID"=${id};
	`, info, (err) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json({Message: "the course has been deleted successfully"});
	});
};