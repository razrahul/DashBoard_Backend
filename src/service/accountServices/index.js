const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");

const Account = require("../../models/Account");
const User = require("../../models/User");

const accountServices = {
  createAccount: async ({ memberId, accountHolderName, accountNumber, IFSCCode, bankName }) => {
  try {
    if (!memberId || !accountHolderName || !accountNumber || !IFSCCode || !bankName) {
      throw new Error("All fields are required to create an account.");
    }

    const existingAccount = await Account.findOne({
      where: { memberId },
      paranoid: false, // include soft-deleted accounts
    });

    if (existingAccount) {
      // ✅ If account was soft-deleted, restore it
      if (existingAccount.deletedAt) {
        await existingAccount.restore(); // restore soft deleted
        return existingAccount;
      }

      // ✅ Return the already active account
      return existingAccount;
    }

    // ✅ If account does not exist at all, create a new one
    const newAccount = await Account.create({
      memberId,
      accountHolderName,
      accountNumber,
      IFSCCode,
      bankName,
    });

    return newAccount;
    } catch (error) {
    throw new Error(error.message || "Internal Server Error");
    }
  },

  getAllAccounts: async () => {
    try {
      const accounts = await Account.findAll({
        include: [
          {
            model: User,
            as: "user", // Assuming 'user' is the alias defined in associations
            attributes: ["id", "firstName", "lastName", "number", "email", "creditScore", "currentBalance", "memberId" ],
          },
        ],
      });
      return accounts;
    } catch (error) {
      throw new Error(error.message || "Internal Server Error");
    }
  },
  getAccountById: async (id) => {
    try {
      const accountData = await Account.findOne({
        where: { memberId: id },
        include: [
          {
            model: User,
            as: "user",
            attributes: [ "id",  "firstName", "lastName", "number", "email", "creditScore", "currentBalance","memberId"],
          },
        ],
      });

      if (!accountData) {
        throw new Error(
          ERROR_MESSAGE.ACCOUNT_NOT_FOUND || "Account not found tunhar."
        );
      }

      return accountData;
    } catch (error) {
      throw new Error(error.message || "Internal Server Error");
    }
  },
  getAccountByMemberId: async ({ memberId }) => {
    try {
      const accountData = await Account.findOne({
        where: { memberId },
        include: [
          {
            model: User,
            as: "user",
            attributes: [ "id", "firstName", "lastName", "number", "email", "creditScore", "currentBalance", "memberId"],
          },
        ],
      });

      if (!accountData) {
        throw new Error(
          ERROR_MESSAGE.ACCOUNT_NOT_FOUND || "Account not found."
        );
      }

      return accountData;
    } catch (error) {
      throw new Error(error.message || "Internal Server Error");
    }
  },
  updateAccountById: async ({memberId,accountHolderName, accountNumber, IFSCCode, bankName }) => {
    try {
      const account = await Account.findOne({
        where: { memberId },
      });
      if (!account) {
        throw new Error(
          ERROR_MESSAGE.ACCOUNT_NOT_FOUND || "Account not found."
        );
      }

      account.accountHolderName = accountHolderName || account.accountHolderName;
      account.accountNumber = accountNumber || account.accountNumber;
      account.IFSCCode = IFSCCode || account.IFSCCode;
      account.bankName = bankName || account.bankName;
      await account.save();

      return account;
    } catch (error) {
      throw new Error(error.message || "Internal Server Error");
    }
  },
  deleteAccountById: async (id) => {
    try {
      const deleted = await Account.destroy({
        where: { memberId: id },
      });

      if (!deleted) {
        throw new Error(
          ERROR_MESSAGE.ACCOUNT_NOT_FOUND || "Account not found."
        );
      }

      return { message: SUCCESS_MESSAGE.ACCOUNT_DELETED_SUCCESSFULLY || "Account deleted successfully." };
    } catch (error) {
      throw new Error(error.message || "Internal Server Error");
    }
  },

  deleteAccountBymemberId: async (memberId) => {
    try {
      const deleted = await Account.destroy({
        where: { memberId },
      });

      if (!deleted) {
        throw new Error(
          ERROR_MESSAGE.ACCOUNT_NOT_FOUND || "Account not found."
        );
      }

      return {
        message: SUCCESS_MESSAGE.ACCOUNT_DELETED_SUCCESSFULLY || "Account deleted successfully."};
    } catch (error) {
      throw new Error(error.message || "Internal Server Error");
    }
  },
};

module.exports = accountServices;
