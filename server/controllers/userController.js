const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('../models/projectModel');

const userController = {};

userController.createUser = (req, res, next) => {

	const { username, password } = req.body;

	if (username || password) {
		//error
	};

	const newUser = [
		username,
		password,
		false
	];

	console.log(newUser);

	const query = `
		INSERT INTO 
		public.user
		(
			username,
			password,
			login
		)
		VALUES
		(
			$1,
			$2,
			$3
		)
	`;

	db.query(query, newUser, (error, response) => {
		if (error) {
			return next({
				//log error
			})
		}
		return next();
	});
};

userController.verifyUser = (req, res, next) => {

	const { username, password, login } = req.body;

	if (!username || !password) {
		//error
	};

	const query = `
		SELECT
		*
		FROM
		public.user
		WHERE
		public.user.username = $1;
	`;

	db.query(query, [username], (error, response) => {
		if (error) {
			return next({
				log: `userController.verifyUser: ERROR: ${typeof error === 'object' ? JSON.stringify(error) : error}`,
				message: { error: 'Error occurred in userController.verifyUser. Check server logs for more details.' },
			});
		}

		if (!response.rows.length) return next({
			log: `userController.verifyUser: ERROR: No username found`,
		});

		if (response.rows[0].password === password) {
			res.locals.userId = response.rows[0]._id;
			res.locals.userInfo = response.rows[0];
			return next();
		}

		else return next({
			log: `userController.verifyUser: ERROR: Wrong password`,
		});
	});
};

userController.loggedIn = (req, res, next) => {

	const query = `
	UPDATE
	public.user
	SET
	login = true
	WHERE
	_id = $1
	`;

	db.query(query, [res.locals.userId], (error, response) => {
		if (error) {
			return next({
				log: `puserController.loggedIn: ERROR: Query error`
			});
		}
		res.locals.userInfo.login = true;
		return next();
	});
};

userController.loggedOut = (req, res, next) => {
	let id;
	req.body.userId ? id = req.body.userId : id = req.cookies.ssid;
	const query = `
	UPDATE
	public.user
	SET
	login = false
	WHERE
	_id = $1
	`;

	db.query(query, [id], (error, response) => {
		if (error) {
			return next({
				log: `userController.loggedOut: ERROR: Query error`
			});
		}
		return next();
	});
};

userController.getUser = (req, res, next) => {

	const query = `
		SELECT
		*
		FROM
		public.user
		WHERE
		_id = $1;
	`;

	db.query(query, [req.cookies.ssid], (error, response) => {
		if (error) {
			return next({
				log: `userController.getUser: ERROR: ${typeof error === 'object' ? JSON.stringify(error) : error}`,
				message: { error: 'Error occurred in userController.verifyUser. Check server logs for more details.' },
			});
		}

		res.locals.userInfo = response.rows[0];
		return next();
	});
};

module.exports = userController;
