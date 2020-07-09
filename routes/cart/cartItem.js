const express = require("express");
const router = express.Router();

const alertMessage = require("../../helpers/messenger");
const ensureAuthenticated = require("../../helpers/auth");

// DB Table
const DeliveryInfo = require("../../models/CartItem");
// DB Table

// Add delivery address
router.post("/add", (req, res) => {
    let {name} = req.body
    console.log(name)
    res.redirect('/')
})


module.exports = router;