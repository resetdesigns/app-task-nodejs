const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should sign up for a new user', async () => {
	const response = await request(app).post('/users').send({
		name: 'Joseph Villajin',
		email: 'hello@josephvillajin.com',
		password: 'MyPass418!',
	});

	// Assert that the database was changed correctly
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	// Assertions about the response
	expect(response.body).toMatchObject({
		user: {
			name: 'Joseph Villajin',
			email: 'hello@josephvillajin.com',
		},
		token: user.tokens[0].token,
	});

	// Assert that the password is not stored in plain text
	expect(user.password).not.toBe('MyPass418!');
});

test('Should not signup user with invalid name/email/password', async () => {
	const response = await request(app)
		.post('/users')
		.send({
			name: 123,
			email: 'invalidemail.com',
			password: 'abc',
		})
		.expect(400);
});

test('Should login existing user', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200);
	const user = await User.findById(response.body.user._id);
	expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistent user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: 'f@k3p@ssw0rd',
		})
		.expect(400);
});

test('Should get profile for user', async () => {
	await request(app)
		.get('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
	await request(app).get('/users/me').expect(401);
});

test('Should delete account for user', async () => {
	await request(app)
		.delete('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

test('Should not delete a user if unauthenticated', async () => {
	await request(app).delete('/users/me').send().expect(401);
});

test('Should not delete account for unauthenticated user', async () => {
	await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
	await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.attach('avatar', 'tests/fixtures/profile-pic.jpg')
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
	const response = await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			name: 'Kim V',
		})
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user.name).toEqual('Kim V');
});

test('Should not update invalid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			location: 'Pasadena',
		})
		.expect(400);
});

test('Should not update user if unauthenticated', async () => {
	await request(app)
		.patch('/users/me')
		.send({
			name: 'Joe',
		})
		.expect(401);
});

test('Should not update the user with an invalid name/email/password', async () => {
	await request(app)
		.post('/users')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			name: true,
			email: 'invalidemail.com',
			password: 'abc',
		})
		.expect(400);
});
