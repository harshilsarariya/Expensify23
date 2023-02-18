const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({});

const UserModel = mongoose.Model("users", UserSchema);

module.exports = UserModel;
