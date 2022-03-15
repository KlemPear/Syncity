const express = require("express");
// controllers
const brief = require("../controllers/brief");

const router = express.Router();

router
	.get("/", brief.onGetAllBriefs)
	.get("/:id", brief.onGetBriefById)
	.post("/create-brief", brief.onCreateBrief)
	.put("/:id/edit", brief.onEditBriefById)
	.delete("/:id", brief.onDeleteBriefById);

module.exports = router;
