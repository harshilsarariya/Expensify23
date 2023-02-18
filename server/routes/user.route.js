const UserModel = require("../models/user.model");

const router = require("express").Router();

// insert user
router.post("/add", (req, res) => {
	const { userName, firstName, lastName, email, phoneNumber, budget } =
		req.body;

	const newUser = new UserModel({
		userName,
		firstName,
		lastName,
		email,
		phoneNumber,
		budget,
	});

	newUser
		.save()
		.then((result) => {
			return res.json({
				success: true,
				data: result,
				msg: "User registered successfully",
			});
		})
		.catch((err) => {
			return res.json({ success: false, err });
		});
});

// update name only
router.post("/update", (req, res) => {
	const { userId, firstName, lastName } = req.body;
	UserModel.findOneAndUpdate(
		{ _id: userId },
		{ firstName, lastName },
		{ new: true }
	)
		.then((result) => {
			return res.json({ success: true, data: result });
		})
		.catch((err) => {
			return res.json({ success: false, err });
		});
});

// add transaction
router.post("/tx/add", async (req, res) => {
	const { amount, category, description, withUser, id, owe, lent } = req.body;

	const txAdder = await UserModel.findOneAndUpdate(
		{ _id: id },
		{
			$push: {
				personalTxs: {
					amount,
					category,
					description,
					owe,
					lent,
					withUser,
				},
			},
		},
		{ new: true }
	);

	// const txOppoUser = await UserModel.findOneAndUpdate(
	// 	{ _id: withUser },
	// 	{
	// 		$push: {
	// 			personalTxs: {
	// 				amount,
	// 				category,
	// 				description,
	// 				owe: lent,
	// 				lent: owe,
	// 				withUser: id,
	// 			},
	// 		},
	// 	},
	// 	{ new: true }
	// );
	return res.json({ success: true, data: txAdder });
	// return res.json({ success: false, err });
});

// update transaction
router.post("/tx/update", async (req, res) => {
	const { amount, category, description, withUser, id, owe, lent, txId } =
		req.body;

	const txUpdater = await UserModel.findOneAndUpdate(
		{ _id: id, "personalTxs._id": txId },
		{
			"personalTxs.$": {
				amount,
				category,
				description,
				owe,
				lent,
				withUser,
			},
		},
		{ new: true }
	);

	return res.json({ success: true, data: txUpdater });
	// return res.json({ success: false, err });
});

// delete transaction
router.post("/tx/delete", async (req, res) => {
	const { id, txId } = req.body;

	UserModel.findOneAndUpdate(
		{ _id: id, "personalTxs._id": txId },

		{
			"personalTxs.$": null,
		},
		{ new: true }
	)
		.then((result) => {
			return res.json({ success: true, data: result });
		})
		.catch((err) => {
			return res.json({ success: false, err });
		});
});

// fetch all the trasactions of user with user id

router.get("/:id", (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.json({ success: false, data: "Please provide user  id  " });
	}

	UserModel.findOne({ _id: id })
		.then((result) => {
			return res.json({ success: true, data: result });
		})
		.catch((err) => {
			return res.json({ success: false, err });
		});
});

//  get  users transactions along with  categories
router.get("/:id/cat", (req, res) => {
	const { id } = req.params;
	const { category } = req.query;

	if (!id) return res.json({ msg: "User id is  required" });
	if (!category) return res.json({ msg: "Category is required" });

	UserModel.findOne({ _id: id, "personalTxs.category": category })
		.select("personalTxs")
		.then((result) => {
			if (result) {
				let filteredResult = result.personalTxs.filter(
					(item) => item.category === category
				);
				return res.json({
					success: true,
					data: filteredResult || [],
				});
			} else {
				return res.json({ success: true, data: [] });
			}
		})
		.catch((err) => {
			console.log(err);
			return res.json({ success: false, err });
		});
});

module.exports = router;
