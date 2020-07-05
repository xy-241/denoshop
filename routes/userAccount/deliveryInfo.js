const express = require("express");
const router = express.Router();

const alertMessage = require("../../helpers/messenger");
const ensureAuthenticated = require("../../helpers/auth");

// DB Table
const DeliveryInfo = require("../../models/DeliveryInfo")
// DB Table

router.post('/addAddress', (req, res) => {
    let {receiverName, phoneNo, country, state, city, blockNo, street, unitNo, postcode} = req.body;
    let userId = req.user.id;
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
        userId
    }).then((addr) => {
        alertMessage(
            res,
            "success",
            "New address added!",
            "fas fa-sign-in-alt",
            true
        );
        res.redirect("/account");
    }).catch(err => console.log(err))

})

router.get("/delete/:id", ensureAuthenticated, (req, res) => {
    DeliveryInfo.findOne({where: {userId: req.params.id}}).then((deliveryAddr) => {
        // Prevent unauthorised users
        if (user.id !== req.user.id) {
			alertMessage(
				res,
				"danger",
				"Unauthorised access to this user",
				"fas fa-exclamation-circle",
				true
			);
			req.logout();
			res.redirect("/login");
		} else if(deliveryAddr) {
            DeliveryInfo.destroy({where: {userId: req.params.id}}).then((destroyInfo)=>{
                alertMessage(
					res,
					"info",
					destroyInfo,
					"fas fa-trash-alt",
					true
				);
            })
        } else {
            alertMessage(
					res,
					"info",
					"Oops, something went wrong. Please try again later",
					"fas fa-trash-alt",
					true
			);
        }
    })
})
module.exports = router;
