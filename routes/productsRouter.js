const express = require("express");
const Data = require("../src/data");

const productsRouter = express.Router();

productsRouter.get("/products", (req, res) => {
  let cookieValue = req.cookies;
  if (cookieValue.cart) {
    let cookieArray = JSON.parse(cookieValue.cart);
  } else {
    let cookieValue = [];
  }
  res.render("products", { products: Data, cartNumb: cookieArray.length });
});

//ajax route
productsRouter.get("/product/:type", (req, res) => {
  const { type } = req.params;
  let tempArray = [];
  for (let i = 0; i < Data.length; i++) {
    if (type === Data[i].type) {
      tempArray.push(Data[i].type);
    }
  }
  //res.render('products')
  res.send({ products: tempArray });
});

productsRouter.get("/addcart/id", (req, res) => {
  const { id } = req.params;
  let cookieValue = req.cookies;
  if (cookieValue.cart) {
    let cookieArray = [];
    cookieArray.push(id);
    let cookieStringArray = JSON.stringify(cookieArray);
    rea.cookie("cart", cookieStringArray);
    res.send({ cartNumb: 1 });
  } else {
    let cartValue = cookieValue.cart;
    let cookieArray = JSON.parse(cartValue);
    cookieArray.push(id);
    var cookieStringArray = JSON.stringify(cookieArray);
    res.clearCookie("cart");
    res.cookie("cart", cookieStringArray);
    res.send({ cartNumb: cookieArray.length });
  }
});
productsRouter.get("/products/id", (req, res) => {
  const { id } = req.params;
  let cookieValue = req.cookies;
  if (cookieValue.cart) {
    let cookieArray = JSON.parse(cookieValue.cart);
  } else {
    let cookieValue = [];
  }

  for (let i = 0; i < Data.length; i++) {
    if (id == Data[i].id) {
      res.render("listing", { product: Data[i], cartNumb: cookieArray.length });
    }
  }
});

module.exports = productsRouter;
