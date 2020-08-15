const express = require("express");
const ensureAuthenticated = require("../../helpers/auth");
const router = express.Router();
const Wishlist = require('../../models/WishList');
const HackingProduct = require('../../models/HackingProduct');
const WishList = require("../../models/WishList");

const {rqs, client} = require("../../config/recombee");


router.post('/add', ensureAuthenticated, (req, res) => {
    let { id } = req.body;
    HackingProduct.findOne({
        where: { id }
    }
    ).then(item => {
        WishList.findOne({ where: { userId: req.user.id, hackingProductId: item.id } })
            .then(inWishlist => {
                if (inWishlist) {
                    console.log('Already exist in wishlist')
                }
                else {
                    Wishlist.create({
                        hackingProductId: item.id,
                        userId: req.user.id,
                        // title: item.title,
                        // quantity: item.quantity,
                        // imageFile: item.imageFile,
                        // price: item.price
                    }).then(_ => {
                        client.send(new rqs.AddBookmark(req.user.id, item.id , { cascadeCreate: true }));
                    })
                }
            })
    }).catch(err => console.log(err))
})


router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    let itemId = req.params.id;
    WishList.destroy({
        where: { hackingProductId: itemId, userId: req.user.id }
    }).then(_ => {
        client.send(new rqs.DeleteBookmark(req.user.id, itemId ));
    }).then(() => {
        res.redirect('/account')
    }).catch((err) => {
        console.log(err)
    })
})


router.get('/get/:id', ensureAuthenticated, (req, res) => {
    let itemId = req.params.id;
    Wishlist.findOne({
        where: { userId: req.user.id, hackingProductId: itemId }
    }).then((wishlist) => {
        res.json(wishlist)
    }).catch((err) => {
        console.log(err)
    })
})


module.exports = router;