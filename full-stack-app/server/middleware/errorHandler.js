const errorHandlerMiddleware = (err, req, res, next) => {
	if (err.code && err.code === 11000) {
		res.json({
			msg: "Duplicate value for the email, please provide a new one",
		});
	}

	if (err.name === "ValidationError") {
		res.json({
			msg: "Invalid credentials, provide them all",
		});
	}

	return res.status(200);
};

module.exports = errorHandlerMiddleware;
