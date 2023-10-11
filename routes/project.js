const Router = require('express')
const {getProjects,addProject, deleteProject} = require("../controllers/projectController");
const {protect} = require("../middleware/authMiddleware");
const router = Router()


router.route('/').get(protect,getProjects).post(protect,addProject)
router.route('/:id').put(protect,).delete(protect,deleteProject)

module.exports = router