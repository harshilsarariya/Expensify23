const UserModel = require("../models/user.model");
const moment = require("moment");
const router = require("express").Router();

// insert user
router.post("/add", (req, res) => {
  const { phoneNumber } = req.body;

  const newUser = new UserModel({
    phoneNumber,
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
router.put("/update", (req, res) => {
  const { id, name } = req.body;
  UserModel.findOneAndUpdate({ _id: id }, { name }, { new: true })
    .then((result) => {
      return res.json({ success: true, data: result });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

// update budget only
router.put("/updateBudget/:id", async (req, res) => {
  const { id } = req.params;
  const { budget } = req.body;

  if (!id) return res.status(401).json({ error: "Invalid Request" });

  const user = await UserModel.findById(id);

  if (!user) return res.status(401).json({ error: "User not found!" });

  user.budget = budget;

  await user.save();

  res.json({
    id: user._id,
    budget,
  });
});

// get budget only
router.get("/getBudget/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(401).json({ error: "Invalid Request" });

  const user = await UserModel.findById(id);

  res.json({
    budget: user.budget,
  });
});

// add transaction
router.put("/tx/add", async (req, res) => {
  const { amount, category, description, withUser, id, owe, lent, txDate } =
    req.body;

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
          txDate,
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

router.get("/getName/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ success: false, data: "Please provide user  id  " });
  }

  UserModel.findOne({ _id: id })
    .then((result) => {
      return res.json({ success: true, data: result.name });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

router.get("/fetchLatestTransactions/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(401).json({ error: "Invalid Request" });

  const user = await UserModel.find({ _id: id });

  res.json({
    transactions: user[0].personalTxs.reverse().slice(0, 5),
  });
});

router.get("/fetchCurrentMonthTransactions/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(401).json({ error: "Invalid Request" });

  const user = await UserModel.findById(id);

  let currMonth = moment(Date.now()).format("MM");

  let tx = new Array();

  user.personalTxs.map((item) => {
    if (
      item.txDate !== undefined &&
      moment(item?.txDate).format("MM") === currMonth
    ) {
      tx.push(item);
    }
  });
  res.json(tx);
});

router.get("/fetchTodaysTransactions/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(401).json({ error: "Invalid Request" });

  const user = await UserModel.findById(id);

  let currMonth = moment(Date.now()).format("MM");
  let currDate = moment(Date.now()).format("DD");
  let tx = new Array();

  user.personalTxs.map((item) => {
    if (
      item.Date !== undefined &&
      moment(item?.txDate).format("MM") === currMonth &&
      moment(item?.txDate).format("DD") === currDate
    ) {
      tx.push(item);
    }
  });

  res.json(tx);
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

// get users transaction for all categories
router.get("/:userId/catwise", async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(401).json({ error: "Invalid Request" });

  const user = await UserModel.find({
    $and: [{ _id: userId }],
  });

  const categoryMap = new Map();

  user[0].personalTxs.map((item) => {
    if (item?.category !== undefined) {
      if (categoryMap.get(item?.category) === undefined) {
        categoryMap.set(item?.category, { expense: 0, total: 0 });
      }
      categoryMap.get(item?.category).expense++;
      if (item?.amount !== undefined) {
        categoryMap.get(item?.category).total += parseInt(item?.amount);
      }
    }
  });

  const cateArr = new Array();

  var iterator_obj = categoryMap.entries();
  let arr;
  while ((arr = iterator_obj.next().value)) {
    cateArr.push(arr);
  }

  let finalObj = new Array();
  for (let index = 0; index < cateArr.length; index++) {
    let myObj = {
      category: cateArr[index][0],
      expense: cateArr[index][1].expense,
      total: cateArr[index][1].total,
    };
    finalObj.push(myObj);
  }
  res.json(finalObj);
});
module.exports = router;
