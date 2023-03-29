const GroupModel = require("../models/group.model");
const UserModel = require("../models/user.model");
const { sendPushNotification } = require("../utilities/PushNotification");

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
  const data = await GroupModel.findOneAndUpdate(
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
  );

  const grp = await GroupModel.findById(grpId);
  const paidByUser = await UserModel.findById(paidBy);
  withUsers?.map(async (wu) => {
    const user = await UserModel.findById(wu.userId);
    const { expoPushToken } = user;

    if (expoPushToken !== undefined) {
      sendPushNotification(
        expoPushToken,
        "New Expense of " +
          description +
          " from " +
          paidByUser.name +
          "in " +
          grp.name
      );
    }
  });

  return res.json({
    success: true,
    data: data,
  });
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

// # settle expenses
router.put("/settle/:groupId", async (req, res) => {
  const { groupId } = req.params;
  const { userId, amount } = req.body;

  try {
    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const userIndex = group.txs.findIndex(
      (tx) => tx.paidBy.toString() !== userId && !tx.settledBy.includes(userId)
    );

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const tx = group.txs[userIndex];
    const totalOwes = tx.withUsers.reduce((acc, user) => {
      if (user.userId.toString() === userId) {
        return acc + user.owe;
      }
      return acc;
    }, 0);

    if (amount > totalOwes) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    tx.settledBy.push(userId);

    tx.withUsers.forEach((user) => {
      if (user.userId.toString() === userId) {
        user.owe = totalOwes - amount;
      } else {
        user.owe = user.owe - (amount / totalOwes) * user.owe;
      }
    });

    await group.save();
    return res.json({ success: true, message: "Expense settled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//  returns the amount that a user has to give to each user in a group
router.get("/exp/:userId/:groupId", async (req, res) => {
  const { userId, groupId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const expenses = group.txs.filter(
      (tx) => tx.paidBy.toString() !== userId && !tx.settledBy.includes(userId)
    );
    const summary = {};
    expenses.forEach((expense) => {
      expense.withUsers.forEach((user) => {
        if (user.userId.toString() === userId) {
          summary[expense.paidBy.toString()] =
            (summary[expense.paidBy.toString()] || 0) + user.owe;
        } else if (user.userId.toString() !== expense.paidBy.toString()) {
          summary[user.userId.toString()] =
            (summary[user.userId.toString()] || 0) - user.owe;
        }
      });
    });
    // The owes field in the response shows how much money you are owed by each group member
    const response = Object.keys(summary).map(async (key) => {
      const user = await UserModel.findById(key).select("name upiId");
      return {
        userId: key,
        name: user.name,
        owes: summary[key],
        upiId: user.upiId,
      };
    });
    return res.json(await Promise.all(response));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
