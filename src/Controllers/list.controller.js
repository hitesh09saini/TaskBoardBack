
require('dotenv').config()
const List = require('../models/list.model')
const ApiError = require('../utils/ApiError')
const AsyncHandler = require('../utils/asynchandler')

const getList = AsyncHandler(async (req, res, next) => {

    const Lists = await List.findById(req.user.list);

    if (!Lists) {
        return next(new ApiError(400, 'User List not exist'))
    }

    res.status(200).json({
        success: true,
        message: 'get all lists succesfully',
        list: Lists.lists,
    })
})

const createList = AsyncHandler(async (req, res, next) => {

    if (!req.body) {
        return next(new ApiError(400, 'All field is required !'))
    }

    const list = await List.findById(req.user.list);
    
    if (!list) {
        return next(new ApiError(400, 'CREATE NEW ACCOUNT!'))
    }

    list.lists.push(req.body);

    await list.save();

    res.status(201).json({
        success: true,
        message: 'List created and associated with the user',
        lists: list.lists,
    });
})

const deleteList = AsyncHandler(async (req, res, next) => {
    const listIdToDelete = req.params.id;

    const list = await List.findById(req.user.list);

    list.lists = list.lists.filter(list => list._id != listIdToDelete);

    await list.save();
    res.status(200).json({
        success: true,
        message: 'List is deleted succesfully',
        lists: list.lists,
    });
})

const createTask = AsyncHandler(async (req, res, next) => {
    const listId = req.params.id;
    const taskData = req.body;

    const list = await List.findById(req.user.list);

    if (!list) {
        return next(new ApiError(404, 'List not found'));
    }

    const lists = list.lists.find(list => list._id == listId);

    if (!lists) {
        return next(new ApiError(404, 'List not found'));
    }

    lists.tasks.push(taskData);

    await list.save();

    res.status(201).json({
        success: true,
        message: 'Task created and associated with the list',
        list: lists.tasks,
    });
});

const editTask = AsyncHandler(async (req, res, next) => {
    const taskId = req.params.taskId;
    const listId = req.params.id;
    const updateTaskData = req.body;

    const list = await List.findById(req.user.list);
    if (!list) {
        return next(new ApiError(404, 'List not found'));
    }

    const foundList = list.lists.find(list => list._id == listId);

    if (!foundList) {
        return next(new ApiError(404, 'List not found'));
    }

    const foundTask = foundList.tasks.find(task => task._id == taskId);

    if (!foundTask) {
        return next(new ApiError(404, 'Task not found'));
    }

    // Update the task
    Object.assign(foundTask, updateTaskData);

    await list.save();

    res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        list: foundList,
    });
});


const deleteTask = AsyncHandler(async (req, res, next) => {
    const taskId = req.params.taskId;
    const listId = req.params.id;

    const list = await List.findById(req.user.list);
    if (!list) {
        return next(new ApiError(404, 'List not found'));
    }

    const foundList = list.lists.find(list => list._id == listId);

    if (!foundList) {
        return next(new ApiError(404, 'List not found'));
    }

    const foundTaskIndex = foundList.tasks.findIndex(task => task._id == taskId);

    if (foundTaskIndex === -1) {
        return next(new ApiError(404, 'Task not found'));
    }

    // Remove the task at the found index
    foundList.tasks.splice(foundTaskIndex, 1);

    await list.save();

    res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
        list: foundList,
    });
});

const editTaskStatus = AsyncHandler(async (req, res, next) => {
    const listId = req.params.id;
    const taskId = req.params.taskId;

    const list = await List.findById(req.user.list);
    if (!list) {
        return next(new ApiError(404, 'List not found'));
    }

    const foundList = list.lists.find(list => list._id == listId);

    if (!foundList) {
        return next(new ApiError(404, 'List not found'));
    }

    const foundTask = foundList.tasks.find(task => task._id == taskId);

    if (!foundTask) {
        return next(new ApiError(404, 'Task not found'));
    }

    console.log(foundTask);

    // Toggle the task status
    foundTask.status = !foundTask.status;

    await list.save();

    res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        list: foundTask.status,
    });
});


module.exports = {
    getList,
    createList,
    deleteList,
    createTask,
    editTask,
    deleteTask,
    editTaskStatus,
}