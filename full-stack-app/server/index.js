const express = require("express");
const connectDB = require("./db/connectDB");

//variables ambiente
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//Importaciones de Seguridad
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//usar paquetes de seguridad
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 100,
	})
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.json());
app.use(express.static("../client/public/index.html"));

const taskRoutes = require("./routes/taskRoutes");
const logRegRoutes = require("./routes/LogRegRoutes");

app.use("/api/logreg", logRegRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api", (req, res) => res.json({ message: "Hola desde el servidor" }));

const start = async () => {
	try {
		await connectDB(process.env.MONGODB_URL);

		app.listen(PORT, () => {
			console.log(`Example app listening on port ${PORT}!`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
