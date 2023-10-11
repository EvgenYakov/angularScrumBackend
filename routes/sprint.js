const Router = require('express')
const {getSprints, addSprint,pushTaskToSprint,completeSprint,getSprint, deleteTaskFromSprint,editSprint,deleteSprint} = require("../controllers/sprintController");
const {protect} = require("../middleware/authMiddleware");
const {checkExp} = require("../middleware/sprintMiddleware")
const router = Router()


router.route('/:id').get(protect,getSprints).post(protect,addSprint)
router.route('/:id').put(protect,checkExp,editSprint).delete(protect,checkExp,deleteSprint)

router.route('/addTask/:id').patch(protect,checkExp,pushTaskToSprint)
router.route('/deleteTask/:id').patch(protect,deleteTaskFromSprint)
router.route('/getSprint/:id').get(protect,getSprint)
router.route('/completeSprint/:id').patch(protect,completeSprint)

module.exports = router