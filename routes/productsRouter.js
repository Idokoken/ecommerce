const express = require("express");
const Data = require("../src/data");

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  res.render("products", { products: Data });
  console.log(Data);
});

module.exports = productsRouter;
