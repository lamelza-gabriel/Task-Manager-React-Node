const express = require("express");

const taskRoutes = express.Router();

const {
	getAllTasks,
	createTask,
	deleteTask,
	updateTask,
} = require("../controllers/taskControllers");

taskRoutes.get("/", getAllTasks);

taskRoutes.post("/", createTask);

taskRoutes.delete("/:id", deleteTask);

taskRoutes.patch("/:id", updateTask);

module.exports = taskRoutes;
