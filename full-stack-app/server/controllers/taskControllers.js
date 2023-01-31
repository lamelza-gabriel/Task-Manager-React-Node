const TaskSchema = require("../models/TaskSchema");
const asyncWrapper = require("../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await TaskSchema.find({});

	if (!tasks) {
		throw new Error("No tasks found");
	}

	res.status(StatusCodes.OK).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await TaskSchema.create(req.body);
	res.status(StatusCodes.CREATED).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const taskID = req.params.id;

	const task = await TaskSchema.findOneAndDelete({ _id: taskID });

	if (!task) {
		throw new Error(`We cannot find a task with the id ${taskID}`);
	}

	res.status(StatusCodes.OK).json({ status: "success, task removed" });
});

const updateTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;

	const task = await TaskSchema.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!task) {
		throw new Error(`No task with the id: ${taskID}`);
	}

	res.status(StatusCodes.OK).json({ task });
});

module.exports = {
	getAllTasks,
	createTask,
	deleteTask,
	updateTask,
};
