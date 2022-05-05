const request = require('supertest');
const { response } = require('../src/app');
const app = require('../src/app');
const Task = require('../src/models/task');
const {
	userOneId,
	userOne,
	userTwoId,
	userTwo,
	taskOne,
	taskTwo,
	taskThree,
	setupDatabase,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
	const response = await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: 'From my test',
		})
		.expect(201);

	const task = await Task.findById(response.body._id);
	expect(task).not.toBeNull();
	expect(task.completed).toEqual(false);
});

test('Should not create a task with an invalid description/completed', async () => {
	await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: 123,
			completed: 'Not a boolean',
		})
		.expect(400);
});

test('Should fetch user tasks', async () => {
	const response = await request(app)
		.get('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
	expect(response.body.length).toBe(2);
});

test('Should not fetch user task by id if unauthenticated', async () => {
	await request(app).get('/tasks').send().expect(401);
});

test('Should fetch only completed tasks', async () => {
	const response = await request(app)
		.get('/tasks?completed=true')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.expect(200);

	response.body.forEach((body) => {
		expect(body.completed).toEqual(true);
	});
});

test('Should fetch only incomplete tasks', async () => {
	const response = await request(app)
		.get('/tasks?completed=false')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.expect(200);

	response.body.forEach((body) => {
		expect(body.completed).toEqual(false);
	});
});

test('Should sort tasks by description/createdAt/updatedAt', async () => {
	await request(app)
		.get('/tasks?sortBy=description:desc')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.expect(200);

	await request(app)
		.get('/tasks?sortBy=createdAt:desc')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.expect(200);

	await request(app)
		.get('/tasks?sortBy=updatedAt:desc')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.expect(200);
});

test('Should fetch a page of tasks', async () => {
	await request(app)
		.get('/tasks?limit=1&skip=1')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.expect(200);
});

test('Should not update task with invalid description/completed', async () => {
	await request(app)
		.patch(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: 123,
			completed: 'Not a boolean',
		})
		.expect(400);
});

test('Should not update other users task', async () => {
	await request(app)
		.patch(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send()
		.expect(404);

	const task = await Task.findById(taskOne._id);
	expect(task).not.toBeNull();
});

test('Should not fetch other users tasks by id', async () => {
	await request(app)
		.get(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send()
		.expect(404);
});

test('Should not fetch another users task', async () => {
	await request(app)
		.delete(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send()
		.expect(404);

	const task = await Task.findById(taskOne._id);
	expect(task).not.toBeNull();
});

test('Should not delete the task if unauthenticated', async () => {
	await request(app).delete(`/tasks/${taskOne._id}`).send().expect(401);
});

test('Should delete user task', async () => {
	await request(app)
		.delete(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	const task = await Task.findById(taskOne._id);
	expect(task).toBeNull();
});
