const express = require("express");
const NotificationController = require("../controller/notification");
const {authenticateToken, isAuthorizeAdmin, authorize} = require("../middlewares");
const  validateSChema = require("../middlewares/validateSchema");
const { notificationCreateSchema, notificationUpdateSchema, notificationDeleteSchema } = require("../middlewares/validationSchema/notificationSchema");

const router = express.Router();

// Route to create a new notification
router.post("/",validateSChema(notificationCreateSchema), authenticateToken, authorize(["superadmin", "admin"]), NotificationController.createNotification);

// Route to get a notification by member --> Self
router.get("/member",authenticateToken, NotificationController.getNotificationByMemberId);

// Route to get all notifications
router.get("/",authenticateToken, authorize(["superadmin", "admin"]), NotificationController.getAllNotifications);

// Route to get a notification by id
router.get("/:id",authenticateToken, NotificationController.getNotificationById);


// Route to update a notification by id
router.put("/:id",validateSChema(notificationUpdateSchema),authenticateToken, authorize(["superadmin", "admin"]), NotificationController.updateNotification); 

// Route to delete a notification by member --> Self
router.delete("/member",authenticateToken, NotificationController.deleteNotificationByMemberId);

// Route to delete a notification by id
router.delete("/:id",validateSChema(notificationDeleteSchema),authenticateToken, authorize(["superadmin", "admin"]), NotificationController.deleteNotification);





module.exports = router;