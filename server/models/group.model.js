const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
	name: { type: String },
	phoneNumber: { type: String },
	budget: { type: Number },
	spent: { type: Number },
	personalTxs: {
		type: [
			mongoose.Schema({
				amount: Number,
				category: String,
				description: String,
				owe: { type: Number, default: 0 },
				lent: { type: Number, default: 0 },
				// withUser: mongoose.Schema({
				// 	userId: mongoose.Types.ObjectId,
				// 	owe: { type: Number, default: 0 },
				// 	lent: { type: Number, default: 0 },
				// }),
				withUser: mongoose.Types.ObjectId,
			}),
		],
	},
});

const GroupModel = mongoose.model("groups", GroupSchema);

module.exports = GroupModel;
