const express = require("express");
const router = express.Router();
const io = require("socket.io-client");
const alertMessage = require("../helpers/messenger");
const Chat = require("../models/Chat");
const e = require("express");

const ensureAuthenticated = require("../helpers/auth");

// const rooms = []
// var request = {}

router.get("/chatForm", ensureAuthenticated, (req, res) => {
	res.render("chat/chatForm.handlebars", {
        title: `Chat Support Form`,
        style: { text: "chat/requestChat.css" },
        userID : req.user.id,
        username : req.user.username,
        email : req.user.email
    });
});

router.get("/videoForm", ensureAuthenticated , (req, res) => {
	res.render("chat/videoForm.handlebars", {
        title: `Video Support Form`,
        style: { text: "chat/requestChat.css" },
        userID : req.user.id,
        username : req.user.username,
        email : req.user.email
    });
});


router.get("/room/:room", ensureAuthenticated , (req, res) => {
    var msgList = []
    Chat.findOne({
        where: {
            Ended: false,
            ClientID : req.user.id,
            id : req.params.room,
        },
        attributes: ['Messages'],
    }) .then(function(room){
        if (!(room)) {
            return res.redirect('/chat/chatForm')
        } else {
            if (room.Messages != null) {
                let messages = room.Messages.split('-')
                for (i=0; i < messages.length; i++) {
                    msgList.push(JSON.parse(messages[i]));
                }
            }
            res.render("chat/room.handlebars", {
                title: `Chat Support`,
                style: { text: "chat/room.css" },
                roomName: req.params.room,
                username : req.user.username,
                msgList,
                // request : request,
            });
        }
        // roomsx.map(room => room.id);
        // let x = roomsx.map(Object.values);
        // let roomsxd = JSON.stringify(x);
        // console.log(roomsx);
        // console.log(roomsxd)
        // if (!(roomsxd.includes(parseInt(req.params.room)))) {
        //     return res.redirect('/chat')
        // }
    });
    // rooms.push(roomID);
    // request = {}
});

router.get("/oneroom/:roomid" , ensureAuthenticated , (req, res) => {
    var alert = res.flashMessenger.danger('Only one live support chat can be active at any time');
        //Make the alert box dismissable
        alert.isDismissible = true;
        alert.titleIcon = "fas fa-exclamation-triangle";
        //set an font awesome icon
        alert.addMessage({chatid: req.params.roomid ,type:'return'});
        alert.addMessage({chatid: req.params.roomid ,type: 'delete'});
        res.redirect("/chat/chatForm");
})

router.get("/redirect/:message" , ensureAuthenticated , (req, res) => {
    if (req.params.message == 'roomend'){
        alertMessage(
            res,
            "danger",
            "Chat has ended",
            "fas fa-exclamation-triangle",
            true
        );
    } else if (req.params.message == 'error'){
        alertMessage(
            res,
            "danger",
            "Chat doesn't exist",
            "fas fa-exclamation-triangle",
            true
        );
    }
    res.redirect("/chat/chatForm");
})

// router.get("/test" , (req , res) => {
//     res.render("chat/videoChat.handlebars", {
//         style: { text: "chat/styles.css" },
//     })
// })

router.get("/videoRoom/:room", ensureAuthenticated , (req , res) => {
    if (req.user.id != req.params.room){
        return res.redirect('/chat/videoForm')
    }
    console.log(req.user,req.user.id,req.params.room)
    res.render("chat/videoChat.handlebars", {
        title: `Video Support`,
        style: { text: "chat/video.css" },
        roomName: req.params.room,
        username : req.user.username,
    });
});

router.get("/ended" , ensureAuthenticated , (req, res) => {
    var alert = res.flashMessenger.danger('Live video chat has ended');
        //Make the alert box dismissable
        alert.isDismissible = true;
        alert.titleIcon = "fas fa-exclamation-triangle";
        //set an font awesome icon
        res.redirect("/chat/videoForm");
})

router.get("/error" , ensureAuthenticated , (req, res) => {
    var alert = res.flashMessenger.danger('Room does not exist');
        //Make the alert box dismissable
        alert.isDismissible = true;
        alert.titleIcon = "fas fa-exclamation-triangle";
        //set an font awesome icon
        res.redirect("/chat/videoForm");
})


module.exports = router;