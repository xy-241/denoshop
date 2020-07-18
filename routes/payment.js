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

router.get("/orderplaced/:orderId", (req, res) => {
    console.log("Orderplaceddddd123");
    console.log(req);

    Order.findOne({
        where: {
            id: req.params.orderId,
            userId: req.user.id,
        }
    }).then(orderObj => {
        var deliveryInfoId = orderObj.deliveryInfoId
        DeliveryInfo.findOne({
            where: {
                id: deliveryInfoId
            }
        }).then(deliveryAddress => {
            console.log(deliveryAddress)
            res.render("user/orderplaced", {
                style: {text: "user/payment/ordersuccess.css"},
                title: "Order Success",
                deliveryAddress,
                order: orderObj,
            })    
        })
    })    
})

let innerReturnFunction = ({sum, cartItems}) => {
    /* this works */
    return {sum, cartItems}; // return an object
}

router.post("/charge", ensureAuthenticated, (req, res) => {
    stripe.customers.update(
        req.user.stripeId,
        {source: req.body.stripeToken}
    ).then(customer => {
        console.log("Finding Cart Items for Charge")
        CartItem.findAll({
            where: {userId: req.user.id}
        }).then(cartItems => {
            var sum = 0

            Array.prototype.forEach.call(cartItems, item => {
                var quantity = item.itemNum
                var price = item.price
                
                var totalprice = price * quantity
                sum += totalprice
            })
            console.log({sum, cartItems})
            console.log("Sum and CartItems return")
            return innerReturnFunction({sum, cartItems})
        }).then(function({sum, cartItems}) {
            console.log(sum)
            console.log(cartItems)
            var amount = sum * 100

            stripe.charges.create({
                amount,
                description: "DenoShop",
                currency: "sgd",
                customer: req.user.stripeId
            }).then(charge => {
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
                        country: country,
                        city: city,
                        street: street,
                        unitNo: unitNo,
                        postcode: postcode,
                        state: state,
                        blockNo: blockNo,
                        phoneNo: phoneNo,
                        receiverName: receiverName,
                        userId: userId,
                    }
                }).then(deliveryObj => {
                    var userId = req.user.id
                    if (deliveryObj == null) {
                        console.log("No deliveryObj found in database")
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
                        }).then(deliveryInfoObj => {
                            var deliveryInfoId = deliveryInfoObj.id
                            var deliveryDate = moment().format(req.body.DeliveryDate, "YYYY-MM-DD")
                            var deliveryTime = req.body.DeliveryTime
                            var chargeId = charge.id
                            Order.create({
                                chargeId,
                                deliveryDate,
                                deliveryTime,
                                userId,
                                deliveryInfoId,
                            }).then(orderObj => {
                                var orderId = orderObj.id
                                var userId = req.user.id

                                Array.prototype.forEach.call(cartItems, item => {
                                    var itemNum = item.itemNum
                                    var title = item.title
                                    var dateAdded = moment().format("YYYY-MM-DD")
                                    PurchaseRecord.create({
                                        title,
                                        itemNum,
                                        dateAdded,
                                        orderId
                                    })
                                })
                                console.log(orderId)
                                return innerReturnFunction({sum: userId, cartItems: orderId})
                            }).then(function({sum, cartItems}) {
                                CartItem.destroy({
                                    where: {
                                        userId: req.user.id,
                                    }
                                })

                                return innerReturnFunction({sum:sum, cartItems:cartItems})    
                            }).then(function({sum, cartItems}) {
                                res.redirect("/payment/orderplaced/" + cartItems)
                            })
                        })
                    } else {
                        var deliveryInfoId = deliveryObj.id
                        var deliveryDate = moment().format(req.body.DeliveryDate, "YYYY-MM-DD")
                        var deliveryTime = req.body.DeliveryTime
                        var chargeId = charge.id

                        Order.create({
                            chargeId,
                            deliveryDate,
                            deliveryTime,
                            userId,
                            deliveryInfoId,
                        }).then(orderObj => {
                            var orderId = orderObj.id
                            var userId = req.user.id

                            Array.prototype.forEach.call(cartItems, item => {
                                var itemNum = item.itemNum
                                var title = item.title
                                var dateAdded = moment().format("YYYY-MM-DD")
                                PurchaseRecord.create({
                                    title,
                                    itemNum,
                                    dateAdded,
                                    orderId
                                })
                            })
                            console.log(innerReturnFunction({sum: userId, cartItems: orderId}))
                            return innerReturnFunction({sum: userId, cartItems: orderId})
                        }).then(function({sum, cartItems}) {
                            CartItem.destroy({
                                where: {
                                    userId: req.user.id,
                                }
                            })

                            return innerReturnFunction({sum:sum, cartItems:cartItems})    
                        }).then(function({sum, cartItems}) {
                            res.redirect("/payment/orderplaced/" + cartItems)
                        })
                    }                    
                })
            })
        })
    })
})

const denoShopDB = require("../config/DBConnection");

router.get("/reset", (res, req) => {
    denoShopDB.setUpDB(true)
});

module.exports = router;