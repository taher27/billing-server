const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const chargesRouter = require("./routes/charges");
const customersRouter = require("./routes/customer");
const url = "mongodb://localhost/billingDB";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected...");
});

app.use(express.json());

app.use("/charges", chargesRouter);
app.use("/customers", customersRouter);

app.listen(9000, () => {
  console.log("Server started.");
});
