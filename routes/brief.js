const express = require("express");
const { isBriefAuthor, validateBrief } = require("../utils/middlewares");
// controllers
const brief = require("../controllers/brief");

const router = express.Router();

router
	.get("/", brief.onGetAllBriefs)
	.get("/private/:id", brief.onGetPrivateBriefs)
	.get("/:id", brief.onGetBriefById)
	.post("/", brief.onCreateBrief)
	.put("/:id", isBriefAuthor, brief.onEditBriefById)
	.delete("/:id", isBriefAuthor, brief.onDeleteBriefById);

module.exports = router;
