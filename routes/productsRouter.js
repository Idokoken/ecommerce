const express = require("express");
const Data = require("../src/data");

const productsRouter = express.Router();

productsRouter.get("/products", (req, res) => {
  let cookieValue = req.cookies;
  let cookieArray;
  if (cookieValue.cart) {
    cookieArray = JSON.parse(cookieValue.cart);
  } else {
    cookieArray = [];
  }
  res.render("products", { products: Data, cartNumb: cookieArray.length });
});

//ajax routes
productsRouter.get("/product/:type", (req, res) => {
  const { type } = req.params;
  let tempArray = [];
  for (let i = 0; i < Data.length; i++) {
    if (type === Data[i].type) {
      tempArray.push(Data[i]);
    }
  }
  //res.render('products')
  res.send({ products: tempArray });
});

productsRouter.get("/addcart/:id", (req, res) => {
  const { id } = req.params;
  let cookieValue = req.cookies;
  if (!cookieValue.cart) {
    let cookieArray = [];
    cookieArray.push(id);
    let cookieStringArray = JSON.stringify(cookieArray);

    res.cookie("cart", cookieStringArray);
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

//single product page
productsRouter.get("/products/:id", (req, res) => {
  const { id } = req.params;
  let cookieArray;
  let cookieValue = req.cookies;
  if (cookieValue.cart) {
    cookieArray = JSON.parse(cookieValue.cart);
  } else {
    cookieArray = [];
  }

  for (let i = 0; i < Data.length; i++) {
    if (id == Data[i].id) {
      console.log(Data[i]);
      res.render("listing", { product: Data[i], cartNumb: cookieArray.length });
    }
  }
});

module.exports = productsRouter;
