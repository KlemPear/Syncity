const express = require("express");
// controllers
const application = require("../controllers/application");

const router = express.Router();

router
	.get("/", application.onGetAllApplications)
	.get("/:id", application.onGetApplicationById)
	.post("/", application.onCreateApplication)
	.put("/:id", application.onEditApplicationById)
	.delete("/:id", application.onDeleteApplicationById);

module.exports = router;
