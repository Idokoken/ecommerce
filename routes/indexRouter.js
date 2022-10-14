const express = require("express");
const Data = require("../src/data");

const indexRouter = express.Router();

indexRouter.get("/cart", (req, res) => {
  const cookieValue = req.cookies;
  let cookieArray;
  let cartTotal;
  let tempcartArray;

  if (cookieValue.cart) {
    cookieArray = JSON.parse(cookieValue.cart);
    //cookieArray = cookieValue.cart;
    cookieArray.sort();

    // console.log(cookieArray);
    tempcartArray = [];
    for (let i = 0; i < cookieArray.length; i++) {
      for (let j = 0; j < Data.length; j++) {
        if (cookieArray[i] == Data[j].id) {
          tempcartArray.push(Data[i]);
        }
      }
    }
    cartTotal = 0;
    for (let i = 0; i < tempcartArray.length; i++) {
      cartTotal = cartTotal + tempcartArray[i].price;
      //cartTotal += tempcartArray[i].price
    }
  } else {
    cartTotal = 0;
    tempcartArray = [];
    cookieArray = [];
    //console.log("cart empty");
  }
  //res.status(200).json({ msg: "cart page" });
  // console.log(cookieArray.length);
  // console.log(tempcartArray);
  // console.log(cartTotal);
  res.render("cart", {
    cartNumb: cookieArray.length,
    cartValues: tempcartArray,
    total: cartTotal,
  });
});

module.exports = indexRouter;
