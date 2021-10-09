const express = require("express");
const ChargesModel = require("../models/charges");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const charges = await ChargesModel.find();
    res.json(charges);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const charges = await ChargesModel.findById(req.params.id);
    res.json(charges);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  const charges = new ChargesModel({
    // id: req.body.id,
    name: req.body.name,
  });
  try {
    const data = await charges.save();
    res.json(data);
  } catch (error) {
    res.send("error: ", error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const charges = await ChargesModel.findById(req.params.id);
    charges.name = req.body.name;
    const data = await charges.save();
    res.json(data);
  } catch (err) {
    res.send("Error: ", err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    const charges = await ChargesModel.findById(id);
    const data = await charges.remove();
    res.json(data);
  } catch (error) {
    console.log("error: ", error);
    res.status(!200).send(error);
  }
});

module.exports = router;
