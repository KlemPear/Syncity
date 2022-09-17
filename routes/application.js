const express = require("express");
const { isApplicationAuthor } = require("../utils/middlewares");
// controllers
const application = require("../controllers/application");

const router = express.Router();

router
	.get("/", application.onGetAllApplications)
	.get("/:id", application.onGetApplicationById)
	.post("/", application.onCreateApplication)
	.put("/:id", isApplicationAuthor, application.onEditApplicationById)
	.delete("/:id", isApplicationAuthor, application.onDeleteApplicationById);

module.exports = router;
