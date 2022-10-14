const express = require("express");
const {
	isBriefAuthor,
	validateBrief,
	isLoggedIn,
} = require("../utils/middlewares");
// controllers
const brief = require("../controllers/brief");

const router = express.Router();

router
	.get("/", isLoggedIn, brief.onGetAllBriefs)
	.get("/private/:id", isLoggedIn, brief.onGetPrivateBriefs)
	.get("/:id", brief.onGetBriefById)
	.post("/", isLoggedIn, brief.onCreateBrief)
	.put("/:id", isLoggedIn, isBriefAuthor, brief.onEditBriefById)
	.delete("/:id", isLoggedIn, isBriefAuthor, brief.onDeleteBriefById);

module.exports = router;
