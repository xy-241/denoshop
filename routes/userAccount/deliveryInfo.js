const express = require("express");
const router = express.Router();

const alertMessage = require("../../helpers/messenger");
const ensureAuthenticated = require("../../helpers/auth");

// DB Table
const DeliveryInfo = require("../../models/DeliveryInfo")
// DB Table

router.post('/addAddress', (req, res) => {
    let {receiverName, phoneNo, country, state, city, blockNo, street, unitNo, postcode} = req.body;
    DeliveryInfo.create({
        country,
        city,
        street,
        unitNo,
        postcode,
        state,
        blockNo,
        phoneNo,
        receiverName,
    }).then((addr) => {
        alertMessage(
            res,
            "success",
            "New address added!",
            "fas fa-sign-in-alt",
            true
        );
        res.redirect("/login");
    }).catch(err => console.log(err))

})
module.exports = router;
