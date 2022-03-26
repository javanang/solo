const path = require('path');
const db = require('../models/projectModel');

productController = {};

productController.getAllProducts = (req, res, next) => {
	const query = `
    SELECT
    p.*, u.username
    FROM
    public.product p
		JOIN
		public.user u
		ON
		p.user_id = u._id
		WHERE
		available = true
    `;

	db.query(query, (error, response) => {
		if (error) {
			return next({
				log: `productController.getAllProducts: ERROR: Query error`
			});
		}
		if (!response.rows.length) console.log('nothing to show');
		res.locals.allProducts = response.rows;
		return next();
	});
};

productController.createProduct = (req, res, next) => {
	const { part_number, description } = req.body;
	const userId = req.cookies.ssid;

	const query = `
    INSERT INTO
    public.product
    (
      part_number,
    	description,
    	available,
    	user_id
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4
    )
    `;

	const product = [
		part_number,
		description,
		false,
		userId
	];

	db.query(query, product, (error, response) => {
		if (error) {
			return next({
				log: `productController.createProduct: ERROR: Query error`
			});
		}
		response ? res.locals.success = true : res.locals.success = false;
		return next();
	});

};

productController.getUserProduct = (req, res, next) => {
	console.log(req.cookies.ssid);
	const { ssid } = req.cookies;

	const query = `
    SELECT
    *
    FROM
    public.product
    WHERE
    user_id = $1
    `;

	db.query(query, [ssid], (error, response) => {
		if (error) {
			return next({
				log: `productController.getUserProduct: ERROR: Query error`
			});
		}
		res.locals.userProducts = response.rows;
		return next();
	});
};

productController.deleteProduct = (req, res, next) => {
	const { _id } = req.body;

	const query = `
	DELETE FROM
	public.product
  WHERE
	_id = $1
	`;

	db.query(query, [_id], (error, response) => {
		if (error) {
			return next({
				log: `productController.deleteProduct: ERROR: Query error`
			});
		}
		console.log(response);
		response ? res.locals.success = true : res.locals.success = false;
		return next();
	});
};

productController.updateAvail = (req, res, next) => {
	const { user_id, available, _id } = req.body;

	const query = `
	UPDATE
	public.product
	SET
	available = $1
	WHERE
	_id = $2
	`;

	db.query(query, [available, _id], (error, response) => {
		if (error) {
			return next({
				log: `productController.updateAvail: ERROR: Query error`
			});
		}
		response ? res.locals.success = true : res.locals.success = false;
		return next();
	});

};

module.exports = productController;
