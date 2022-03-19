const path = require('path');
const db = require('../models/projectModel');

productController = {};

productController.getAllProducts = (req, res, next) => {
	const query = `
    SELECT
    *
    FROM
    public.product
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
    _id = $1
    `;

	db.query(query, [ssid], (error, response) => {
		if (error) {
			return next({
				log: `productController.getUserProduct: ERROR: Query error`
			});
		}
		console.log(response);
		res.locals.userProducts = response.rows;
		return next();
	});
};

productController.deleteProduct = (req, res, next) => {
	const productId = req.body.productId;

	const query = `
	DELETE FROM
	public.product
  WHERE
	_id = $1
	`;

	db.query(query, [productId], (error, response) => {
		console.log(response);
		return next();
	});
};

productController.updateAvail = (req, res, next) => {

};

module.exports = productController;
