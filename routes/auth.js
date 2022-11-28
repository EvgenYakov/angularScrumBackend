const Router = require('express')
const {register, refresh,login, logout} = require("../controllers/authController");
const router = Router()


router.post('/register',register)
router.post('/refresh', refresh)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router