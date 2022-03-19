const path = require('path');
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
			return next();
		}
		
		else return next({
			log: `userController.verifyUser: ERROR: Wrong password`,
		});
	});
};

module.exports = userController;
