const express = require("express");
const app = express();
const dotenv = require("dotenv");

// database configurations
require("./database/index");

// routes import

const userRoute = require("./routes/user.route");
const tailwoRoute = require("./routes/twilio.router");

// enviorment variables configurations
dotenv.config();

app.use(express.json());

// test route
app.get("/", (req, res) => {
	res.json({ msg: "Server is up and running" });
});

// middlewares

app.use("/api/user", userRoute);
app.use("/api", tailwoRoute);
app.listen(process.env.PORT, () => {
	console.log("server is listening on port : " + process.env.PORT);
});
