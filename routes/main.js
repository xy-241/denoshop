const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("home", {
		style: { text: "userInterface/home.css" },
		title: "Home",
	});
});

module.exports = router;
