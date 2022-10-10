const express = require("express");
const data = require("../src/data");

const indexRouter = express.Router();

indexRouter.get("/cart", (req, res) => {
  const cookieValue = req.cookies;
  if (cookievalue.cart) {
    let cookieArray = JSON.parse(cookieValue);
    cookieArray.sort();

    let tempcartArray = [];
    for (let i = 0; i < cookieArray.length; i++) {
      for (let j = 0; j < Data.length; j++) {
        if (cookieArray[i] == Data[j].id) {
          tempcartArray.push(Data[i]);
        }
      }
    }
    let cartTotal = 0;
    for (let i = 0; i < tempcartArray.length; i++) {
      cartTotal = cartTotal + tempcartArray[i].price;
    }
  } else {
    let cartTotal = 0;
    let tempcartArray = [];
    let cookieArray = [];
  }

  res.render("cart", {
    cartNumb: cookieArray.length,
    cartValues: tempcartArray,
    total: cartTotal,
  });
});

module.exports = indexRouter;
