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
    var cartItems = []

    var price = 20
    var imageFile = "http://tinyurl.com/yb2z9wdb"
    var dateAdded = "2020-07-11"
    var title = "Arduino"
    var itemNum = 2
    var userId = req.user.id
    CartItem.create({
        price,
        imageFile,
        dateAdded,
        title,
        itemNum,
        userId
    }).then(cartItem => {
        cartItems.push(cartItem)
    })

    CartItem.findAll({
        where: {
            userId: req.user.id
        }
    }).then(cartItems => {
        res.render("user/cart", {
            style: { text: "user/shopping/cart.css"},
            title: "Cart",
            cartItems
        });
    })
});

router.get("/checkout", ensureAuthenticated, (req, res) => {

    DeliveryInfo.findAll({
        where: {
            userId: req.user.id
        }
    }).then((AddressList) =>{
        let defaultAddress = AddressList[0];

        CartItem.findAll({
            where: {
                userId: req.user.id
            }
        }).then(cartItems => {
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

router.get("/orderplaced/:id", (req, res) => {
    console.log("Orderplaceddddd123");
    console.log(req);

    Order.findOne({
        where: {
            orderId: req.params.id
        }
    }).then(orderObj => {
        var deliveryAddressId = orderObj.deliveryAddressId
        DeliveryInfo.findOne({
            where: {
                id: deliveryAddressId
            }
        }).then(deliveryAddress => {
            res.render("user/orderplaced", {
                style: {text: "user/payment/ordersuccess.css"},
                title: "Order Success",
                deliveryAddress,
                order: orderObj,
            })    
        })
    })    
})

router.post("/charge", (req, res) => {
    console.log(req.body)
    console.log("here is the charge req :>")
    let {
		receiverName,
		phoneNo,
		country,
		state,
		city,
		blockNo,
		street,
		unitNo,
		postcode,
    } = req.body;
    let userId = req.user.id;

    DeliveryInfo.findOne({
        where: {
            userId: userId,
            receiverName: receiverName,
            postcode: postcode
        }
    }).then(deliveryObj => {
        console.log("Delivery Obj here")
        console.log(deliveryObj)
        if (deliveryObj == null) {
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
                userId,
            })        
        }
    }).then(DeliveryInfoObj =>
        stripe.customers.update(
            req.user.stripeId,
            {source: req.body.stripeToken}
        )).then(customer => {
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
        }).then((sum) => {
            console.log(sum);
            var amount = sum * 100  // 1 dollar in stripe is 100

            stripe.charges.create({
                amount,
                description: "DenoShop",
                currency: "sgd",
                customer: req.user.stripeId,
            }).then(charge => {
                console.log(charge)
                var chargeId = charge.id;

                CartItem.findAll({
                    where: {
                        userId: req.user.id,
                    },
                }).then((cartItems) => {
                    Array.prototype.forEach.call(cartItems, item => {
                        var itemNum = item.itemNum
                        var title = item.title
                        var dateAdded = moment().format("YYYY-MM-DD")
                        var review = ""
                        var rating = 0
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

                    DeliveryInfo.findOne({
                        where: {
                            userId: userId,
                            receiverName: receiverName,
                            postcode: postcode
                        }
                    }).then(deliveryInfoObject => {
                        var deliveryAddressId = deliveryInfoObject.id
                        var deliveryDate = moment(req.body.deliveryDate, "YYYY-MM-DD");
                        console.log(deliveryDate)
                        var deliveryTime = req.body.deliveryTime;
                        Order.create({
                            chargeId,
                            deliveryDate,
                            deliveryTime,
                            deliveryAddressId
                        }).then(orderObj => {
                            var orderId = orderObj.id

                            res.redirect("/payment/orderplaced/?id=" + orderId)
                        })
                    })
                })
            })
        })
    })
})

module.exports = router;