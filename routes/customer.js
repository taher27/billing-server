const express = require("express");
const CustomerModel = require("../models/customer");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customer = await CustomerModel.find();
    res.json(customer);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    res.json(customer);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  const customer = new CustomerModel({
    cname: req.body.cname,
    address: req.body.address,
    phone: req.body.phone,
    vat: req.body.vat,
    pobox: req.body.pobox,
    region: req.body.region,
  });
  try {
    const data = await customer.save();
    res.json(data);
  } catch (error) {
    res.send("error: ", error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    customer.cname = req.body.name;
    customer.address = req.body.address;
    customer.phone = req.body.phone;
    customer.vat = req.body.vat;
    customer.pobox = req.body.pobox;
    customer.region = req.body.region;
    
    const data = await customer.save();
    res.json(data);
  } catch (err) {
    res.send("Error: ", err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    const customer = await CustomerModel.findById(id);
    const data = await customer.remove();
    res.json(data);
  } catch (error) {
    console.log("error: ", error);
    res.status(!200).send(error);
  }
});

module.exports = router;
