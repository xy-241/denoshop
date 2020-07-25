if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const paypalClientId = process.env.PAYPAL_CLIENT_ID;
const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET;

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

const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox',
    'client_id': paypalClientId,
    'client_secret': paypalClientSecret
});

router.get("/add", (req, res) => {  //Add sample cartItems!!
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

router.post("/charge", ensureAuthenticated, async (req, res) => {
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
        orderDescription,
        deliveryTime,
    } = req.body;
    let userId = req.user.id;

    const deliveryDate = moment(req.body.DeliveryDate).format("YYYY-MM-DD")
    
    const customer = await stripe.customers.update(
                                req.user.stripeId,
                                {source: req.body.stripeToken}
                            ).then(customer => {return customer})
    const cartItems = await CartItem.findAll({
                            where: {userId: req.user.id}
                        }).then(cartItems => {return cartItems})

    let sum = 0

    Array.prototype.forEach.call(cartItems, item => {
        var quantity = item.itemNum
        var price = item.price
        var totalprice = price * quantity
        sum += totalprice
    })

    const amount = sum * 100

    const charge = await stripe.charges.create({
                                amount,
                                description: orderDescription,
                                currency: "sgd",
                                customer: req.user.stripeId
                            }).then(charge => {
                                return charge
                            }).catch(err => {
                                console.log(err)
                            })

    let deliveryObj = await DeliveryInfo.findOne({
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
                                    return deliveryObj
                                }).catch(err => {
                                    console.log(err)
                                })

    if (deliveryObj == null) {
        const newDeliveryObj = await DeliveryInfo.create({
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
                                        }).then(newDeliveryObj => {
                                            return newDeliveryObj
                                        }).catch(err => {
                                            console.log(err)
                                        })
        deliveryObj = newDeliveryObj
    }
    
    let deliveryInfoId = deliveryObj.id
    let chargeId = charge.id
    var orderStatus = 1

    console.log(deliveryDate)
    const order = await Order.create({
                            chargeId,
                            deliveryDate,
                            deliveryTime,
                            orderDescription,
                            orderStatus,
                            orderSum: sum,
                            userId,
                            deliveryInfoId
                        }).then(orderObj => {
                            return orderObj
                        }).catch(err => {
                            console.log(err)
                        })
    
    let orderId = order.id
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
    CartItem.destroy({
        where: {
            userId: req.user.id,
        }
    }).catch(err => {
        console.log(err)
    })
    res.redirect("/payment/orderplaced/" + orderId)
})

router.get("/retrieve/:addrId", ensureAuthenticated, (req, res) => {
    DeliveryInfo.findOne({
        where: {
            id: req.params.addrId,
            userId: req.user.id
        }
    }).then(deliveryAddr => {
        console.log(deliveryAddr)
        res.json(deliveryAddr)

    })
})

module.exports = router;