const express = require("express");
// controllers
const brief = require("../controllers/brief");

const router = express.Router();

router
	.get("/", brief.onGetAllBriefs)
	.get("/:id", brief.onGetBriefById)
	.post("/", brief.onCreateBrief)
	.put("/:id", brief.onEditBriefById)
	.delete("/:id", brief.onDeleteBriefById);

module.exports = router;
