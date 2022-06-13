const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});

	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

/*
 * 	OPTIONS
 * 	GET /tasks?completed=true
 * 	GET /tasks?limit=10&skip=10
 * 	GET /tasks?sortBy=createdAt:desc
 */
router.get('/tasks', auth, async (req, res) => {
	const match = {};
	const sort = {};

	if (req.query.completed) {
		match.completed = req.query.completed === 'true';
	}

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
	}

	try {
		await req.user.populate({
			path: 'tasks',
			match, // use object shorthand since the property and value have the same name
			options: {
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip),
				sort, // use object shorthand since the property and value have the same name
			},
		});
		res.send(req.user.tasks);
	} catch (error) {
		res.status(500).send();
	}
});

router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findOne({ _id, owner: req.user._id });

		if (!task) {
			return res.status(404).send();
		}

		return res.send(task);
	} catch (error) {
		res.status(500).send();
	}
});

router.patch('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		const task = await Task.findOne({ _id: _id, owner: req.user._id });

		if (!task) {
			return res.status(404).send();
		}

		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();

		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findOneAndDelete({ _id: _id, owner: req.user._id });

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (error) {
		res.status(500).send();
	}
});

const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please upload an image file'));
		}

		cb(undefined, true);
	},
});

router.post(
	'/tasks/:id/image',
	auth,
	upload.single('image'),
	async (req, res) => {
		const _id = req.params.id;

		try {
			const task = await Task.findOne({ _id, owner: req.user._id });

			if (!task) {
				return res.status(404).send();
			}

			const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
			task.image = buffer;
			await task.save();
			res.send(task);
		} catch (error) {
			res.status(500).send();
		}
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

router.delete('/tasks/:id/image', auth, async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findOne({ _id: _id, owner: req.user._id });

		console.log(task);

		if (!task || !task.image) {
			return res.status(404).send();
		}

		task.image = undefined;

		await task.save();

		res.send(task);
	} catch (error) {
		res.status(500).send();
	}
});

module.exports = router;
