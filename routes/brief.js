const express = require("express");
const { isBriefAuthor, validateBrief } = require("../utils/middlewares");
// controllers
const brief = require("../controllers/brief");

const router = express.Router();

router
	.get("/", brief.onGetAllBriefs)
	.get("/private/:id", brief.onGetPrivateBriefs)
	.get("/:id", brief.onGetBriefById)
	.post("/", validateBrief, brief.onCreateBrief)
	.put("/:id", isBriefAuthor, validateBrief, brief.onEditBriefById)
	.delete("/:id", isBriefAuthor, brief.onDeleteBriefById);

module.exports = router;
