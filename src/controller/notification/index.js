const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");

const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../../utils/response");

const NotificationServices = require("../../service/notificationServices");

const NotificationController = {
    createNotification: async (req, res) => {
        try {
            const { notificationType, notificationTitle, notificationMessage, memberId } = req.body;

            if (!notificationType || !notificationTitle || !notificationMessage || !memberId) {
                throw new Error(ERROR_MESSAGE.NOTIFICATION_FIELDS_REQUIRED || "All notification fields are required.");
            }

            const newNotification = await NotificationServices.createNotification({
                notificationType,
                notificationTitle,
                notificationMessage,
                memberId,
            });

            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.NOTIFICATION_CREATED_SUCCESSFULLY || "Notification created successfully.",
                newNotification,
                201
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },
    getNotificationByMemberId: async (req, res) => {
        try {
            const { memberId } = req.user;
            const notifications = await NotificationServices.getNotificationByMemberId1(memberId);
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.NOTIFICATIONS_FETCHED_SUCCESSFULLY || "Notifications fetched successfully.",
                notifications,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },
    getAllNotifications: async (req, res) => {
        try {
            const notifications = await NotificationServices.getAllNotifications();
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.NOTIFICATIONS_FETCHED_SUCCESSFULLY || "Notifications fetched successfully.",
                notifications,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },
    getNotificationById: async (req, res) => {
        try {
            const { id } = req.params;
            const notification = await NotificationServices.getNotificationById(id);
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.NOTIFICATION_FETCHED_SUCCESSFULLY || "Notification fetched successfully.",
                notification,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },
    
    deleteNotification: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await NotificationServices.deleteNotification(id);
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.NOTIFICATION_DELETED || "Notification deleted successfully.",
                response,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },
    updateNotification: async (req, res) => {
        try {
            const { id } = req.params;
            const { notificationType, notificationTitle, notificationMessage, memberId } = req.body;

            if (!id || !notificationType || !notificationTitle || !notificationMessage || !memberId) {
                throw new Error(ERROR_MESSAGE.NOTIFICATION_FIELDS_REQUIRED || "All notification fields are required.");
            }

            const updatedNotification = await NotificationServices.updateNotification(id, {
                notificationType,
                notificationTitle,
                notificationMessage,
                memberId,
            });

            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.NOTIFICATION_UPDATED_SUCCESSFULLY || "Notification updated successfully.",
                updatedNotification,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },

    deleteNotificationByMemberId: async (req, res) => {
        try {
            const { memberId } = req.user;
            const response = await NotificationServices.deleteNotificationByMemberId(memberId);
            sendSuccessResponse(
                res,
                SUCCESS_MESSAGE.NOTIFICATION_DELETED || "Notification deleted successfully.",
                response,
                200
            );
        } catch (error) {
            sendErrorResponse(
                res,
                ERROR_MESSAGE.SOMETHING_WENT_WRONG || error.message,
                error.message,
                500
            );
        }
    },
};

module.exports = NotificationController;