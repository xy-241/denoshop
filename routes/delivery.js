if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(stripeSecretKey);

router.get("/status", (req, res) => {
    res.render("delivery/deliveryupdate", {
        style: { text: "user/delivery/deliveryupdate.css"},
        title: "Delivery",
    });
});


module.exports = router;