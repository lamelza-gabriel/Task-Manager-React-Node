//importar schema para filtrar info recibida
const User = require("../models/LogRegSchema");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
	const token = user.createJWT();
	res.status(StatusCodes.CREATED).json({
		user: { name: user.name, email: user.email, id: user._id },
		token,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new Error("Please provide an email and password");
	}

	const user = await User.findOne({ email });

	if (!user) {
		res.json({ msg: "Invalid credentials, user or email are not correct" });
	}

	//comparamos passwords
	const isPasswordCorrect = await user.comparePassword(password);

	if (!isPasswordCorrect) {
		res.json({ msg: "Password is not correct" });
	}

	//en caso de que este registrado le enviamos el token con el metodo createJWT
	const token = user.createJWT();

	res.status(StatusCodes.OK).json({
		user: { name: user.name, email: user.email, id: user._id },
		token,
	});
};

module.exports = {
	register,
	login,
};
