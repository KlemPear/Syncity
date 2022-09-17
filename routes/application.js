const express = require("express");
const { isApplicationAuthor, validateApplication } = require("../utils/middlewares");
// controllers
const application = require("../controllers/application");

const router = express.Router();

router
	.get("/", application.onGetAllApplications)
	.get("/:id", application.onGetApplicationById)
	.post("/", validateApplication, application.onCreateApplication)
	.put("/:id", isApplicationAuthor, validateApplication, application.onEditApplicationById)
	.delete("/:id", isApplicationAuthor, application.onDeleteApplicationById);

module.exports = router;
