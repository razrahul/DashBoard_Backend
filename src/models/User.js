const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");
const Role = require("./Role");
const { encrypt, decrypt } = require("../utils/encryption");

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    roleId: {
      type: DataTypes.UUID,
      references: {
        model: Role,
        key: "uuId",
      },
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pan: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue("pan", encrypt(value));
      },
      get() {
        const value = this.getDataValue("pan");
        return value ? decrypt(value) : null;
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creditScore: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentBalance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    memberId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
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

// Hook to generate memberId before creation
User.beforeCreate(async (user, options) => {
  const firstInitial = user.firstName?.charAt(0).toUpperCase() || '';
  const lastInitial = user.lastName?.charAt(0).toUpperCase() || '';

  const initials = `${firstInitial}${lastInitial}`;

  const count = await User.count({
    where: {
      memberId: {
        [sequelize.Op.like]: `${initials}%`,
      },
    },
  });

  const memberNumber = String(count + 1).padStart(3, '0'); 
  user.memberId = `${initials}${memberNumber}`;
});

module.exports = User;
