const GroupModel = require("../models/group.model");
const UserModel = require("../models/user.model");

const router = require("express").Router();

// create group
router.post("/add", async (req, res) => {
	const { name, description, members } = req.body;
	const newGroup = new GroupModel({
		name,
		description,
		members,
	});

	const createdGrp = await newGroup.save();

	// add group id to all users

	const grpId = createdGrp._id;
	const grpMembers = createdGrp.members;
	console.log("grpId", grpId);
	console.log("grpM", grpMembers);

	await grpMembers.forEach(async (grpMemId) => {
		await UserModel.findOneAndUpdate(
			{ _id: grpMemId },
			{ $push: { groups: grpId } }
		);
	});

	return res.json({
		success: true,
		data: createdGrp,
		msg: "Group Created Succesfuly",
	});
});

// get group details and members
router.get("/:grpId", async (req, res) => {
	const { grpId } = req.params;
	const grp = await GroupModel.findOne({ _id: grpId });
	return res.json({ success: true, data: grp });
});

// add member
router.post("/members/add", async (req, res) => {
	const { grpId, members } = req.body;
	const updatedGrp = await GroupModel.findOneAndUpdate(
		{ _id: grpId },
		{ $set: { members: members } },
		{ new: true }
	);

	members?.forEach(async (memberId) => {
		await UserModel.findOneAndUpdate(
			{
				_id: memberId,
			},
			{
				$push: {
					groups: grpId,
				},
			}
		);
	});

	return res.json({
		success: true,
		data: updatedGrp,
	});
});

// remove member
router.post("/members/remove", async (req, res) => {
	const { grpId, members } = req.body;

	const updatedGrp = await GroupModel.findOneAndUpdate(
		{ _id: grpId },
		{ $pullAll: { members: members } },
		{ new: true }
	);

	members?.forEach(async (memberId) => {
		await UserModel.findOneAndUpdate(
			{
				_id: memberId,
			},
			{
				$pull: {
					groups: grpId,
				},
			}
		);
	});

	return res.json({
		success: true,
		data: updatedGrp,
	});
});

// add transaction
router.post("/tx/add", (req, res) => {});

// remove transaction
router.post("/tx/remove", (req, res) => {});

// edit  transaction
router.post("/tx/update", (req, res) => {});

// settle transaction
router.post("/tx/settle", (req, res) => {});

module.exports = router;
