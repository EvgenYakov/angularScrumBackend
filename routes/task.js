const Router = require('express')
const {register} = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");
const {getTasks, addTask,changeStatus,editTask, deleteTask} = require("../controllers/taskController");
const {checkExpWithTask} = require("../middleware/sprintMiddleware");
const router = Router()


router.route("/:id").get(protect, getTasks).post(protect,addTask)
router.route("/:id").put(protect, editTask).delete(protect,deleteTask)

router.route("/changeStatus/:id").patch(protect,checkExpWithTask,changeStatus)


module.exports = router