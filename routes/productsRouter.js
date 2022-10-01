const express = require("express")

const productsRouter = express.Router()

productsRouter.get('/', (req, res) => {
	res.render('products')
})

module.exports = productsRouter
