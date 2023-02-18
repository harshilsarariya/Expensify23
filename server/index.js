const express = require("express");
const app = express();
const dotenv = require("dotenv");

// database configurations
require("./database/index");

// enviorment variables configurations
dotenv.config();

// test route

app.get("/", (req, res) => {
	res.json({ msg: "Server is up and running" });
});

app.listen(process.env.PORT, () => {
	console.log("server is listening on port : " + process.env.PORT);
});
