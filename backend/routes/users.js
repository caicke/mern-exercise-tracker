const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

// get all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).status("Error: ", err));
});

//get an specific user
router.route("/:id").get(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    res.status(200).send(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// create an user
router.route("/add").post(async (req, res) => {
  try {
    const username = req.body.username;
    const newUser = new User({ username });

    await newUser.save();
    res.json(newUser);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// delete an user
router.route("/delete/:id").delete(async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);

    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// update an user
router.route("/update/:id").post(async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    user.username = req.body.username;

    await user.save();

    res.send(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
