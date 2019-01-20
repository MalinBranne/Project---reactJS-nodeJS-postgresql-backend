const router = require("express").Router();
const categoryRoute = require("../controller/categoryController");

router.get("/", categoryRoute._getAllCategories); // Get all category
router.get("/:id", categoryRoute._getCategory); // Get specific category
router.post("/", categoryRoute._addNewCategory); // Add new category
router.post("/:id", categoryRoute._editCategory); // Modify category
router.delete("/:id", categoryRoute._deleteCategory); // Delete category

module.exports = router;