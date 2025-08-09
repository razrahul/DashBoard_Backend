const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");

const Notification = require("../../models/Notification");
const  User = require("../../models/User");
// const { getNotificationByMemberId } = require("../../controller/notification");
// const { where } = require("sequelize");


const NotificationServices = {
    createNotification: async ({ notificationType, notificationTitle, notificationMessage, memberId }) =>
    {
        try {
            if (!notificationType || !notificationTitle || !notificationMessage || !memberId) {
                throw new Error(ERROR_MESSAGE.NOTIFICATION_FIELDS_REQUIRED || "All notification fields are required.");
            }

            const newNotification = await Notification.create({
                notificationType,
                notificationTitle,
                notificationMessage,
                memberId,
            });

            return newNotification;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

    getNotificationByMemberId1: async (memberId) => {
        try {
            const notifications = await Notification.findAll({
            where: { memberId },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "firstName", "lastName", "email", "number", "photo"],
                    // required: true,
                }
            ],
            order: [["createdAt", "DESC"]], // ⬅️ Sort by latest first
            });
            return notifications;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },
    getAllNotifications: async () => {
        try {
            const notifications = await Notification.findAll(
                {
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["id", "firstName", "lastName", "email", "number", "photo"],
                            // required: true,
                        }
                    ],
                    order: [["createdAt", "DESC"]],
                }
            ); // ⬅️ Sort by latest first
            return notifications;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },
    getNotificationById: async (id) => {
        try {
            const notification = await Notification.findOne({ 
                where: { uuId:id },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "firstName", "lastName", "email", "number", "photo"],
                        // required: true,
                    }
                ],
            });
            if (!notification) throw new Error(ERROR_MESSAGE.NOTIFICATION_NOT_FOUND || "Notification not found");
            return notification;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    

    deleteNotification: async (id) => {
        try {
            const notification = await Notification.destroy({ where: { uuId: id } });
            if (!notification) throw new Error(ERROR_MESSAGE.NOTIFICATION_NOT_FOUND || "Notification not found");
            
            return { message: SUCCESS_MESSAGE.NOTIFICATION_DELETED || "Notification deleted successfully" };
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },
    updateNotification: async (id, { notificationType, notificationTitle, notificationMessage, memberId }) => {
        try {
            const notification = await Notification.findOne({ where: { uuId: id } });
            if (!notification) throw new Error(ERROR_MESSAGE.NOTIFICATION_NOT_FOUND || "Notification not found");

            notification.notificationType = notificationType;
            notification.notificationTitle = notificationTitle;
            notification.notificationMessage = notificationMessage;
            notification.memberId = memberId;

            await notification.save();
            return notification;
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },


    deleteNotificationByMemberId: async (memberId) => {
        try {
            const notifications = await Notification.destroy({ where: { memberId } });
            if (!notifications) throw new Error(ERROR_MESSAGE.NOTIFICATION_NOT_FOUND || "Notification not found");
            
            return { message: SUCCESS_MESSAGE.NOTIFICATION_DELETED || "Notification deleted successfully" };
        } catch (error) {
            throw new Error(error.message || "Internal Server Error");
        }
    },

};

module.exports = NotificationServices;