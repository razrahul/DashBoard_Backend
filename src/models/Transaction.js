const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    memberId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "User", 
        key: "memberId",
      },
      onDelete: "CASCADE", // Optional: define what happens on delete
      onUpdate: "CASCADE", // Optional: define what happens on update
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Plan", 
        key: "uuId", 
      },
      onDelete: "CASCADE",   // ✅ Plan delete होने पर planId null हो जाएगा
      onUpdate: "CASCADE",    // Plan id update होने पर transaction update हो जाएगा
    },
    transactionType: {
      type: DataTypes.STRING, // credit / debit / investment
      allowNull: false,
    },
    transactionAmount: {
      type: DataTypes.DECIMAL(10, 2), // decimal better than string
      allowNull: false,
    },
    transactionStatus: {
      type: DataTypes.STRING, // created, success, failed, refunded
      allowNull: false,
    },

    // 🔹 Razorpay Specific Fields
    razorpayOrderId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    razorpayPaymentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    razorpaySignature: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // 🔹 Extra Info
    currency: {
      type: DataTypes.STRING,
      defaultValue: "INR",
    },
    paymentMethod: {
      type: DataTypes.STRING, // UPI, card, wallet, netbanking
      allowNull: true,
    },
    paymentStatus: {    // authorized, captured, failed, refunded for payment through razorpay
    type: DataTypes.ENUM("created", "authorized", "captured", "failed", "refunded"),
    defaultValue: "created"
    },

    capturedAt: {
      type: DataTypes.DATE,
      allowNull: true, // payment capture ka time
    },

    approvedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    rejectBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    ...BaseModel.rawAttributes,
  },
  {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  }
);

// ✅ Custom auto-increment logic
Transaction.beforeCreate(async (instance) => {
  if (!instance.id) {
    const max = (await Transaction.max("id")) || 0;
    instance.id = max + 1;
  }
});

module.exports = Transaction;