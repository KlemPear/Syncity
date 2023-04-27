const express = require("express");
const { isLoggedIn, validateUser, authLimiter } = require("../utils/middlewares");
// controllers
const user = require("../controllers/user");
const passport = require("passport");
const router = express.Router();

router
	// .get("/", user.onGetAllUsers)
	.get("/session", user.getSession)
	.post("/register", user.onCreateUser)
	.post("/login", authLimiter, passport.authenticate("local"), user.login)
	.post("/:id/tokens", isLoggedIn, user.onAddTokens)
	.post("/:id/burn-brief-token", isLoggedIn, user.onBurnBriefToken)
	.post("/:id/burn-pitch-token", isLoggedIn, user.onBurnPitchToken)
	.post("/search", isLoggedIn, user.onSearch)
	.post("/invite", isLoggedIn, user.onInviteNewUser)
	.post("/forgot-password", user.onForgotPassword)
	.post("/reset-password/:confirmationCode", user.onResetPassword)
	.put("/:id", isLoggedIn, user.onUpdateUser)
	.get("/logout", isLoggedIn, user.logout)
	// .get("/:id", user.onGetUserById)
	.get("/confirm/:confirmationCode", user.verifyUser)
	.get("/reset-password/:confirmationCode", user.onGetUserByConfirmationCode)
	// .delete("/:id", user.onDeleteUserById);

module.exports = router;
