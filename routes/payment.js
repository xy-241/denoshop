if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const express = require("express");
const ensureAuthenticated = require('../helpers/auth');
const router = express.Router();
const stripe = require("stripe")(stripeSecretKey);

// DB Table
const DeliveryInfo = require("../models/DeliveryInfo");
// DB Table

const CartItem = require("../models/CartItem");
const PurchaseRecord = require("../models/PurchaseRecord");
const Order = require("../models/Order");

const moment = require("moment");

router.get("/cart", (req, res) => {
    res.render("user/cart", {
        style: { text: "user/shopping/cart.css"},
        title: "Cart",
        cartItems: [{
			category: "tools",
			title: "Arduino",
			imageFile: "http://tinyurl.com/yb2z9wdb",
            price: "20",
            itemNum: 2,
		}],
    });
});

router.get("/checkout", ensureAuthenticated, (req, res) => {
    DeliveryInfo.findAll({
        where: {
            userId: req.user.id
        }
    }).then((AddressList) =>{
        let defaultAddress = AddressList[0];

        let cartItems = CartItem.findAll({
            where: {
                userId: req.user.id
            }
        })

        let sum = 0
        Array.prototype.forEach.call(cartItems, item => {
            let price = item.price;
            let quantity = item.itemNum;

            let total = quantity * price;
            sum += total;
        });    

		res.render("user/checkout", {
            style: { text: "user/shopping/checkoutdelivery.css"},
            title: "Checkout",
            sum,
            cartItems,
            defaultAddress,
            AddressList,
            stripePublicKey: stripePublicKey
	    });
    })
});

router.get("/privacypolicy", (req, res) => {
    res.render("user/privacypolicy", {
        style: {text: "user/payment/privacypolicy.css"},
        title: "Privacy Policy",
    })
});

router.get("/useragreement", (req, res) => {
    res.render("user/useragreement", {
        style: {text: "user/payment/useragreement.css"},
        title: "User Agreement",
    })
});

router.get("/orderplaced", (req, res) => {
    console.log("Orderplaceddddd123");
    console.log(req);
    res.render("user/orderplaced", {
        style: {text: "user/payment/ordersuccess.css"},
        title: "Order Success",
        DeliveryAddress,
        DeliveryEmail,
        DeliveryPostal
    })
})

router.post("/charge", (req, res) => {

    stripe.customers.update(
            req.user.stripeId,
            {source: req.body.stripeToken}
    ).then(customer => {
        CartItem.findAll({
            where: {
                userId: req.user.id,
            },
        }).then((cartItems) => {
            var items = []
            var sum = 0

            Array.prototype.forEach.call(cartItems, item => {
                var quantity = item.itemNum
                var price = item.price
                
                var totalprice = price * quantity;
                sum += totalprice;

                items.push({
                    item
                })
            })
            return sum
        })
    }).then((sum) => {
        console.log(sum);
        stripe.charges.create({
            amount,
            description: "DenoShop",
            currency: "sgd",
            customer: customer.id,
            })
    }).then(charge => {
        var chargeId = charge.id;

        CartItem.findAll({
            where: {
                userId: req.user.id,
            },
        }).then((cartItems) => {
            Array.prototype.forEach.call(cartItems, item => {
                var itemNum = item.itemNum
                var title = item.title
                var dateAdded = moment.format("YYYY-MM-DD")
                
                PurchaseRecord.create({
                    title,
                    itemNum,
                    dateAdded,
                    review,
                    rating,
                    chargeId
                })    
            })
        }).then(purchaserecord => {
            CartItem.destroy({
                where: {
                    userId: req.user.id,
                }
            })
            var deliveryDate = moment(req.body.deliveryDate, "YYYY-MM-DD");
            var deliveryTime = req.body.deliveryTime;
            Order.create({
                chargeId,
                deliveryDate,
                deliveryTime
            })
        })
    })
})

module.exports = router;