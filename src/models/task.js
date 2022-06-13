const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: true,
			trim: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		image: {
			type: Buffer,
		},
	},
	{
		timestamps: true,
	}
);

// methods are accessible on the instance of a model (instance methods)
taskSchema.methods.toJSON = function () {
	const task = this;
	const taskObject = task.toObject();

	delete taskObject.image;
	return taskObject;
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
