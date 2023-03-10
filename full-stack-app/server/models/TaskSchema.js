const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	task: {
		type: String,
		required: [true, "must provide the task"],
		trim: true,
		maxlength: [40, "Tarea muy larga"],
	},
	completed: {
		type: String,
	},
	state: {
		type: Boolean,
		default: false,
	},
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: [true, "please provide the user Id"],
	},
});

module.exports = mongoose.model("TaskSchema", TaskSchema);
