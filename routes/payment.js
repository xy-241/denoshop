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
        if (AddressList == []) {
            
        }
        let defaultAddress = AddressList[0];

		res.render("user/checkout", {
            style: { text: "user/shopping/checkoutdelivery.css"},
            title: "Checkout",
            sum: 70,
            cartItems: [{
                itemNum: 2,
                title: "Examplessss",
                price: 20,
            },{
                itemNum: 1,
                title: "Hmmmm",
                price: 30,
            }],
            defaultAddress,
            AddressList,
            stripePublicKey: stripePublicKey
	    });
    })
});
	// res.render("user/checkout", {
	// 	style: { text: "user/shopping/checkoutdelivery.css"},
	// 	title: "Checkout",
	// 	sum: 70,
	// 	AddressList: [
	// 		{
	// 		firstname: "Alex",
	// 		lastname: "Tan",
	// 		address: "something something address",
	// 		country: "Singapore",
	// 		city: "Singapore",
	// 		postalcode: 123456,
	// 		mobile: 98765432,},
	// 		{
	// 			firstname: "Alex",
	// 			lastname: "Tan",
	// 			address: "something something address",
	// 			country: "Singapore",
	// 			city: "Singapore",
	// 			postalcode: 123456,
	// 			mobile: 98765432,
	// 		}
    //     ],
    //     stripePublicKey: stripePublicKey,
	// });
// })

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

    CartItem.findAll({
        where: {
            userId: req.user.id,
        },
    }).then((cartItems) => {
        var items = []
        cartItems.forEach(function(item) {
            var itemdata = []
            var quantity = item.quantity
            var price = item.price
            var id = item.id
            itemdata.push({
                product: id,
                unit_amount: price,
                currency: 'sgd',
            })
            items.push({
                price_data: itemdata,
                quantity: quantity,
            })
        })
    });


    let amount = 500;

    console.log(req.body);
    res.send('Test');
    
    stripe.customers.update(
        req.user.stripeId,
        {source: req.body.stripeToken}
    ).then(customer =>
        stripe.charges.create({
            amount,
            description: "DenoShop",
            currency: "sgd",
            customer: customer.id,
            })
        ).then(charge => {
        console.log(charge);
        console.log("test");
    })
})

    
    //     
    
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
// });

module.exports = router;