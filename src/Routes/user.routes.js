const { Router } = require("express");
const {register} = require('../Controllers/user.controller')
const router = Router();

router.route('/register')
.post(register)

module.exports = router;