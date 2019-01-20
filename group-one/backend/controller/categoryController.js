const db = require("../db");
const config = require("../config/index");

exports._getAllCategories = (req, res) => {
	const info = config.db; 
	const courseID = req.query.courseID;
	
	let query;
	if(courseID){
		query = `SELECT ${info.schema}."Categories"."CategoryID", "Name" FROM ${info.schema}."Categories"
		INNER JOIN ${info.schema}."Courses_Categories" 
		ON ${info.schema}."Courses_Categories"."CategoryID"=${info.schema}."Categories"."CategoryID" 
		WHERE "CourseID"=${courseID}`;
	}
	else{
		query = `SELECT * FROM ${info.schema}."Categories"`;
	}

	db.query(query, info, (err, result) => {
		if (err) {
			return res.status(404).json(err);
		}
		return res.status(200).json(result.rows);
	});
};

exports._getCategory = () => {

};

exports._addNewCategory = (req, res) => {
	const info = config.db;
	const { courseID, name } = req.body;
	
	db.query(`
	INSERT INTO ${info.schema}."Categories" 
	VALUES( DEFAULT, '${name}' )
	RETURNING "Categories"."CategoryID"`, 
	info, (err, result) => {
		if (err) {
			return res.status(500).json(err);
		}

		const categoryID = result.rows[0].CategoryID;
		db.query(`
		INSERT INTO ${info.schema}."Courses_Categories"
		VALUES (${courseID}, ${categoryID})`,
		info, (err) => {
			if(err) {
				return res.status(404).json(err);
			}
			return res.status(200).json(result.rows[0]);
		});
	});
};

exports._editCategory = (req, res) => {
	const info = config.db;
	const { id } = req.params; 
	const { name } = req.body;
	
	db.query(`
	UPDATE ${info.schema}."Categories" SET "Name"='${name}' WHERE "CategoryID"=${id}`, 
	info, (err) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json({Message: "the category has been edited successfully"});
	});
};

exports._deleteCategory = (req, res) => {
	const info = config.db;
	const { id } = req.params; 

	db.query(`
	DELETE FROM ${info.schema}."Categories" WHERE "CategoryID"=${id};

	DELETE FROM ${info.schema}."Courses_Categories" WHERE "CategoryID"=${id};

	DELETE FROM ${info.schema}."Tasks" T USING ${info.schema}."Categories_Tasks" CT
	WHERE CT."CategoryID"=${id} AND CT."TaskID"=T."TaskID";

	DELETE FROM ${info.schema}."Categories_Tasks" WHERE "CategoryID"=${id};`, 
	info, (err) => {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json({Message: "the category has been deleted successfully"});
	});
};