const express = require("express");
// controllers
const user = require("../controllers/user");
const passport = require("passport");

const router = express.Router();

router
	.get("/", user.onGetAllUsers)
	.get("/session", user.getSession)
	.post("/register", user.onCreateUser)
	.post(
		"/login",
		passport.authenticate("local"),
		user.login
	)
	.get("/logout", user.logout)
	.get("/:id", user.onGetUserById)
	.delete("/:id", user.onDeleteUserById);

module.exports = router;
