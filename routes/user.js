const express = require("express");
// controllers
const user = require("../controllers/user");
const passport = require("passport");

const router = express.Router();

router
	.get("/", user.onGetAllUsers)
	.get("/session", user.getSession)
	.post("/register", user.onCreateUser)
	.post("/login", passport.authenticate("local"), user.login)
	.post("/:id/tokens", user.onAddTokens)
	.post("/search", user.onSearch)
	.post("/invite", user.onInviteNewUser)
	.post("/forgot-password", user.onForgotPassword)
	.post("/reset-password/:confirmationCode", user.onResetPassword)
	.put("/:id", user.onUpdateUser)
	.get("/logout", user.logout)
	.get("/:id", user.onGetUserById)
	.get("/confirm/:confirmationCode", user.verifyUser)
	.get("/reset-password/:confirmationCode", user.onGetUserByConfirmationCode)
	.delete("/:id", user.onDeleteUserById);

module.exports = router;
