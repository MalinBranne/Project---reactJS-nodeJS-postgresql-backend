const router = require("express").Router();
const courseRoute = require("../controller/courseController");

router.get("/", courseRoute._getAllCourses); // Get all courses
router.get("/:id", courseRoute._getCourse); // Get specific course
router.post("/", courseRoute._addNewCourse); // Add new course
router.post("/:id", courseRoute._editCourse); // Modify course
router.delete("/:id", courseRoute._deleteCourse); // Delete course

module.exports = router;