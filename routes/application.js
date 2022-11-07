const express = require("express");
const {
	isApplicationAuthor,
	isLoggedIn,
	validateApplication,
} = require("../utils/middlewares");
// controllers
const application = require("../controllers/application");

const router = express.Router();

router
	.get("/", application.onGetAllApplications)
	.get("/liked", application.onGetAllUsersLikedApplications)
	.get("/successful", application.onGetAllUsersSuccessfulApplications)
	.get("/:id", application.onGetApplicationById)
	.post("/", isLoggedIn, application.onCreateApplication)
	.put(
		"/:id",
		isLoggedIn,
		isApplicationAuthor,
		application.onEditApplicationById
	)
	.put("/:id/like", isLoggedIn, application.onEditApplicationById)
	.delete(
		"/:id",
		isLoggedIn,
		isApplicationAuthor,
		application.onDeleteApplicationById
	);

module.exports = router;
