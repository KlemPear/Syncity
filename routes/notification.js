const express = require("express");
// controllers
const notification = require("../controllers/notification");

const router = express.Router();

router
	.get("/", notification.onGetAllNotifications)
	.get("/:id", notification.onGetNotificationById)
	.post("/", notification.onCreateNotification)
	.put("/:id", notification.onEditNotificationById)
	.delete("/:id", notification.onDeleteNotificationById);

module.exports = router;
