const GroupModel = require("../models/group.model");
const UserModel = require("../models/user.model");

const router = require("express").Router();

// # create group
router.post("/add", async (req, res) => {
  const { name, members } = req.body;
  const newGroup = new GroupModel({
    name,
    members,
  });

  const createdGrp = await newGroup.save();

  // add group id to all users
  const grpId = createdGrp._id;
  const grpMembers = createdGrp.members;

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

// # get group details and members
router.get("/:grpId", async (req, res) => {
  const { grpId } = req.params;
  if (!grpId) {
    return res.json({ success: false, msg: "Group id  cannot be  empty!" });
  }
  const grp = await GroupModel.findOne({ _id: grpId });
  return res.json({ success: true, data: grp });
});

// # add member
router.post("/:grpId/members/add", async (req, res) => {
  const { grpId } = req.params;
  if (!grpId) {
    return res.json({ success: false, msg: "Group id  cannot be  empty!" });
  }
  const { members } = req.body;
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

// # remove member
router.put("/:grpId/members/remove", async (req, res) => {
  const { grpId } = req.params;
  if (!grpId) {
    return res.json({ success: false, msg: "Group id  cannot be  empty!" });
  }
  const { members } = req.body;

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

router.delete("/deleteGrp/:grpId", async (req, res) => {
  const { grpId } = req.params;
  if (!grpId) {
    return res.json({ success: false, msg: "Group id  cannot be  empty!" });
  }

  const grp = await GroupModel.findByIdAndDelete(grpId);

  res.json({ success: true, grp });
});

// # add transaction
router.post("/:grpId/tx/add", async (req, res) => {
  const { grpId } = req.params;
  if (!grpId) {
    return res.json({ success: false, msg: "Group id  cannot be  empty!" });
  }

  const { paidBy, amount, category, description, lent, withUsers, txDate } =
    req.body;
  GroupModel.findOneAndUpdate(
    { _id: grpId },
    {
      $push: {
        txs: {
          paidBy,
          amount,
          category,
          description,
          lent,
          withUsers,
          txDate,
        },
      },
    },
    { new: true }
  )
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) => console.log(err));
});

// # remove transaction
router.put("/:grpId/tx/:txId/remove", async (req, res) => {
  const { grpId, txId } = req.params;

  if (!grpId)
    return res.json({ success: false, msg: "Group id cannot  be empty" });
  if (!txId) return res.json({ success: false, msg: "Tx id cannot  be empty" });

  await GroupModel.findOneAndUpdate(
    { _id: grpId, "txs._id": txId },
    {
      $pull: { txs: { _id: txId } },
    },
    { new: true }
  )
    .then((result) =>
      res.json({
        success: true,
        data: result,
      })
    )
    .catch((err) => console.log(err));
});

// # edit the transaction
router.put("/:grpId/tx/:txId/update", (req, res) => {
  const { grpId, txId } = req.params;
  const { paidBy, amount, category, description, lent, withUsers, txDate } =
    req.body;
  if (!grpId)
    return res.json({ success: false, msg: "Group Id cannot  be  empty!" });
  GroupModel.findOneAndUpdate(
    { _id: grpId, "txs._id": txId },
    {
      "txs.$": {
        paidBy,
        amount,
        category,
        description,
        lent,
        withUsers,
        txDate,
      },
    },
    { new: true }
  )
    .then((result) => {
      return res.json({ success: true, data: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// # get all groups
router.get("/get/all", (req, res) => {
  GroupModel.find({}).then((result) => {
    return res.json({ success: true, data: result });
  });
});

// settle transaction
router.get("/:grpId/tx/settle/:ofUser/:withUser", async (req, res) => {
  const { grpId, ofUser, withUser } = req.params;
  const allTxs = await GroupModel.findOne({ _id: grpId }).select("txs");

  let total = 0;
  if (allTxs) {
    allTxs.txs.forEach((txItem) => {
      if (txItem?.paidBy == ofUser) {
        txItem.withUsers.forEach((wu) => {
          if (wu.userId == withUser) {
            total += wu.owe;
          }
        });
      } else if (txItem.paidBy == withUser) {
        txItem.withUsers.forEach((wu) => {
          if (wu.userId == ofUser) {
            total -= wu.owe;
          }
        });
      }
    });
  }

  const { upiId } = await UserModel.findOne({ _id: ofUser }).select("upiId");
  return res.json({
    succes: true,
    data: total,
    linkToPay: `upi://pay?pa=${upiId}&am=${total}`,
  });
});

// # settle expenses
router.put("/:grpId/tx/settle/:ofUser/:withUser", async (req, res) => {
  const { grpId, ofUser, withUser } = req.params;

  const allTxs = await GroupModel.findOne({ _id: grpId }).select("txs");
  if (allTxs) {
    allTxs.txs.forEach(async (txItem) => {
      if (txItem?.paidBy == ofUser) {
        await txItem.withUsers.forEach(async (wu) => {
          if (wu.userId == withUser) {
            await txItem.settledBy.push(withUser);
          }
        });
      }
    });
  }
  await allTxs.save();

  return res.json({
    succes: true,
    msg: "Updated Succesfully",
  });
});

module.exports = router;
