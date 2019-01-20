const db = require("../db/index");
const config = require("../config/index");

exports._getAllTasks = (req, res) => {
	const info = config.db;
	const courseID = req.query.courseID;

	let query;
	if(courseID){
		query = `SELECT ${info.schema}."Tasks"."TaskID", "Title", "CategoryID", "Note", "Deadline", "Done" FROM ${info.schema}."Tasks"
		INNER JOIN ${info.schema}."Courses_Tasks" ON ${info.schema}."Courses_Tasks"."TaskID"=${info.schema}."Tasks"."TaskID" 
		INNER JOIN ${info.schema}."Categories_Tasks" ON ${info.schema}."Categories_Tasks"."TaskID"=${info.schema}."Tasks"."TaskID"
		WHERE "CourseID"=${courseID}`;
	}
	else{
		query = `SELECT * FROM ${info.schema}."Tasks"`;
	}

	db.query(query, info, (err, result) => {
		if(err) {
			console.log(err);
			return res.status(404).json(err);
		}
		return res.status(200).json(result.rows);
	});
};

exports._getTask = () => {

};

exports._addNewTask = (req, res) => {
	const info = config.db;
	const { courseID, categoryID, title, note, done, deadline } = req.body;

	db.query(`
	INSERT INTO ${info.schema}."Tasks" 
	("TaskID", "Title", "Note", "Deadline", "Done") 
	VALUES (DEFAULT, '${title}', '${note}', '${deadline}', '${done}')
	RETURNING "Tasks"."TaskID"`, 
	info, (err, result) => {
		if(err) {
			return res.status(405).json({error: "Error adding"});
		}

		const taskID = result.rows[0].TaskID;
		db.query(`
		INSERT INTO ${info.schema}."Courses_Tasks"
		VALUES (${courseID}, ${taskID});
		
		INSERT INTO ${info.schema}."Categories_Tasks"
		VALUES (${categoryID}, ${taskID})`,
		info, (err) => {
			if(err) {
				return res.status(404).json({error: "Error category and Course"});
			}
			return res.status(200).json({message: "task has been added successfully", taskID});
		});
	});
};

exports._editTask = (req, res) => {
	const info = config.db;
	const { id } = req.params; 
	const { title, note, deadline, done } = req.body;
	
	db.query(`
	UPDATE ${info.schema}."Tasks" SET "Title"='${title}', "Note"='${note}', "Deadline"='${deadline}', "Done"=${done} WHERE "TaskID"=${id}`, 
	info, (err) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json({Message: "the task has been edited successfully"});
	});
};
  
exports._deleteTask = (req, res) => {
	const info = config.db;
	const { id } = req.params; 

	db.query(`
	DELETE FROM ${info.schema}."Tasks" WHERE "TaskID"=${id};
	DELETE FROM ${info.schema}."Courses_Tasks" WHERE "TaskID"=${id};
	DELETE FROM ${info.schema}."Categories_Tasks" WHERE "TaskID"=${id};`, 
	info, (err) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json({Message: "the task has been deleted successfully"});
	});
};