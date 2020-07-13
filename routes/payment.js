if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(stripeSecretKey);

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

router.get("/checkout", (req, res) => {
       
	res.render("user/checkout", {
		style: { text: "user/shopping/checkoutdelivery.css"},
		title: "Checkout",
		cartItems: [{
			itemNum: 2,
			title: "Examplessss",
			price: 20,
		},{
			itemNum: 1,
			title: "Hmmmm",
			price: 30,
		}],
		sum: 70,
		AddressList: [
			{
			firstname: "Alex",
			lastname: "Tan",
			address: "something something address",
			country: "Singapore",
			city: "Singapore",
			postalcode: 123456,
			mobile: 98765432,},
			{
				firstname: "Alex",
				lastname: "Tan",
				address: "something something address",
				country: "Singapore",
				city: "Singapore",
				postalcode: 123456,
				mobile: 98765432,
			}
        ],
        stripePublicKey: stripePublicKey,
	});
})

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
    res.render("user/orderplaced", {
        style: {text: "user/payment/ordersuccess.css"},
        title: "Order Success",
    })
})

router.post("/purchaseStripe", (req, res) => {
    

    res.redirect("/payment/orderplaced");
    // if (req.user.stripeid == null){
    //     stripe.customers.create({
            
    //         address: [{
    //             city: city,
    //             line1: addressline1,
    //             line2: addressline2,
    //             postalcode: postalcode,
    //             state: state,
    //         }],
    //         shipping: [{
    //             address: shippingAddress,
    //             name: shippingName,
    //             phone: shippingPhone,
    //         }]
    //     }).then(customer => {
    //         req.user.stripeid = customer.id
    //     })
    // }

    // const expiry = document.getElementById('expDate').split('/')
    // const expMonth = expiry[0]
    // const expYear = expiry[1]

    // CartItem.findAll({
    //     where: {
    //         userId: req.user.id,
    //     },
    // }).then((cartItems) => {
    //     var items = []
    //     cartItems.forEach(function(item) {
    //         var itemdata = []
    //         var quantity = item.quantity
    //         var price = item.price
    //         var id = item.id
    //         itemdata.push({
    //             product: id,
    //             unit_amount: price,
    //             currency: 'sgd',
    //         })
    //         items.push({
    //             price_data: itemdata,
    //             quantity: quantity,
    //         })
    //     })},

    //     // stripe.tokens.create({
    //     //     card: {
    //     //         number: document.getElementById('cardNumber'),
    //     //         exp_month: expMonth,
    //     //         exp_year: expYear,
    //     //         cvc: document.getElementById('cvv'),
    //     //     },
    //     //     function(err, token) {
    //     //         if (err){
    //     //             console.log(err.message)
    //     //             res.status(err.code).end()
    //     //         } else{
    //     //             stripe.charges.create({
    //     //                 amount: sum,
    //     //                 currency: 'sgd',
    //     //                 customer: req.user.stripeid,
    //     //                 recipient_email: document.getElementById('email'),
    //     //                 source: token,
    //     //                 shipping: [{
    //     //                     address: [{
    //     //                         line1: document.getElementById('address'),
    //     //                         postal_code: document.getElementById('postal'),
    //     //                     }],
    //     //                     name: document.getElementById('name'),
    //     //                 }],
    //     //                 capture: true,
    //     //             }),
    //     //             function(err, charge){
    //     //                 if (err){
    //     //                     console.log(err.message)
    //     //                     res.status(err.code).end()
    //     //                 } else if (charge){
    //     //                     console.log('Purchase Successful')
    //     //                     res.json({ message: 'Successfully purchased items'})
    //     //                 }
    //     //             };
    //     //         };
    //     //     }
    //     // }),
    // );
});

module.exports = router;