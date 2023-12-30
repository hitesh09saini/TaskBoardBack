const { Router } = require("express");
const isLoggedIn = require('../middlewares/auth.middleware')
const {getList, createList, deleteList, createTask, editTask, deleteTask, editTaskStatus} = require('../Controllers/list.controller')
const router = Router();

router.route('/')
.get(isLoggedIn, getList)

router.route('/createList')
.post(isLoggedIn, createList)

router.route('/:id')
.delete(isLoggedIn, deleteList)

router.route('/task/:id')
.post(isLoggedIn, createTask)

router.route('/task/:id/:taskId')
.put(isLoggedIn, editTask)
.delete(isLoggedIn, deleteTask)

router.route('/status/:id/:taskId')
.put(isLoggedIn, editTaskStatus)


module.exports = router;