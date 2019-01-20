const router = require("express").Router();
const taskRoute = require("../controller/taskController");

router.get("/", taskRoute._getAllTasks); // Get all tasks
router.get("/:id", taskRoute._getTask); // Get specific task
router.post("/", taskRoute._addNewTask); // Add new task
router.post("/:id", taskRoute._editTask); // Modify task
router.delete("/:id", taskRoute._deleteTask); // Delete task 

module.exports = router;