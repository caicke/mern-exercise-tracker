const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise.model");

// get all exercises
router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get an specific exercise
router.route("/:id").get(async (req, res) => {
  try {
    const exerciseId = req.params.id;
    const exercise = await Exercise.findById(exerciseId);

    res.status(200).send(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// create an exercise
router.route("/add").post(async (req, res) => {
  try {
    const newExercise = new Exercise({
      username: req.body.username,
      description: req.body.description,
      duration: req.body.duration,
      date: new Date().toLocaleDateString("en-US"),
    });
    await newExercise.save();
    res.json(newExercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// delete an exercise
router.route("/delete/:id").delete(async (req, res) => {
  try {
    const exerciseId = req.params.id;
    await Exercise.findByIdAndDelete(exerciseId);

    res.send("Exercise deleted successfully.");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//update an exercise
router.route("/update/:id").post(async (req, res) => {
  try {
    const exerciseId = req.params.id;
    const exercise = await Exercise.findById(exerciseId);

    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);
    exercise.__v += 1; // update version

    await exercise.save();

    res.send(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
