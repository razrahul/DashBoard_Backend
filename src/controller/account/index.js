const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");

const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/response");

const accountServices = require("../../service/accountServices");

const accountController = {
  createAccount: async (req, res) => {
    try {
      const { memberId } = req.user;
      const { accountHolderName, accountNumber, IFSCCode, bankName } = req.body;

      if (!memberId) {
        throw new Error(
          ERROR_MESSAGE.MEMBER_ID_REQUIRED || "Member ID is required."
        );
      }

      const newAccount = await accountServices.createAccount({
        memberId,
        accountHolderName,
        accountNumber,
        IFSCCode,
        bankName,
      });

      sendSuccessResponse(
        res,
        SUCCESS_MESSAGE.ACCOUNT_CREATED_SUCCESSFULLY || "Account created successfully.",
        newAccount,
        201
      );
    } catch (error) {
      sendErrorResponse(
        res,
        ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        error.message,
        500
      );
    }
  },
  getAllAccounts: async (req, res) => {
    try {
      const accounts = await accountServices.getAllAccounts();
      sendSuccessResponse(
        res,
        SUCCESS_MESSAGE.ACCOUNTS_FETCHED_SUCCESSFULLY ||"Accounts fetched successfully.",
        accounts,
        200
      );
    } catch (error) {
      sendErrorResponse(
        res,
        error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        error.message,
        500
      );
    }
  },

  getAccountById: async (req, res) => {
    try {
      const { memberId } = req.params;
      const accountData = await accountServices.getAccountById(memberId);

      if (!accountData) {
        throw new Error(ERROR_MESSAGE.ACCOUNT_NOT_FOUND || "Account not found .");
      }

      sendSuccessResponse(
        res,
        SUCCESS_MESSAGE.ACCOUNT_FETCHED_SUCCESSFULLY ||"Account fetched successfully.",
        accountData,
        200
      );
    } catch (error) {
      sendErrorResponse(
        res,
        error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        error.message,
        500
      );
    }
  },
  getAccountByUserMemberId: async (req, res) => {
    try {
      const { memberId } = req.user;

      if (!memberId) {
        throw new Error(ERROR_MESSAGE.MEMBER_ID_REQUIRED || "Member ID is required.");
      }

      const accountData = await accountServices.getAccountByMemberId({
        memberId,
      });

      if (!accountData) {
        throw new Error(ERROR_MESSAGE.ACCOUNT_NOT_FOUND || "Account not found.");
      }

      sendSuccessResponse(
        res,
        SUCCESS_MESSAGE.ACCOUNT_FETCHED_SUCCESSFULLY || "Account fetched successfully.",
        accountData,
        200
      );
    } catch (error) {
      sendErrorResponse(
        res,
        error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        error.message,
        500
      );
    }
  },
  updateAccountById: async (req, res) => {
    try {
      const { memberId } = req.user;

      const { accountHolderName, accountNumber, IFSCCode, bankName } = req.body;

      if (!memberId) {
        throw new Error(ERROR_MESSAGE.MEMBER_ID_REQUIRED || "Menber ID Does'nt Match.");
      }

      const updatedAccount = await accountServices.updateAccountById({memberId, accountHolderName, accountNumber, IFSCCode, bankName});

      sendSuccessResponse(
        res,
        SUCCESS_MESSAGE.ACCOUNT_UPDATED_SUCCESSFULLY ||"Account updated successfully.",
        updatedAccount,
        200
      );
    } catch (error) {
      sendErrorResponse(
        res,
        error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        error.message,
        500
      );
    }
  },
  deleteAccountById: async (req, res) => {
    try {
      const { memberId } = req.params;

      if (!memberId) {
        throw new Error(ERROR_MESSAGE.MEMBER_ID_REQUIRED || "Account ID is required.");
      }

      const deletedAccount = await accountServices.deleteAccountById(memberId);

      if (!deletedAccount) {
        throw new Error(
          ERROR_MESSAGE.ACCOUNT_NOT_FOUND || "Account not found."
        );
      }

      sendSuccessResponse(
        res,
        SUCCESS_MESSAGE.ACCOUNT_DELETED_SUCCESSFULLY ||"Account deleted successfully.",
        deletedAccount,
        200
      );
    } catch (error) {
      sendErrorResponse(
        res,
        error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        error.message,
        500
      );
    }
  },
  deleteAccountByMemberId: async (req, res) => {
    try {
      const { memberId } = req.user;

      if (!memberId) {
        throw new Error(ERROR_MESSAGE.MEMBER_ID_REQUIRED || "Member ID Does'nt Match.");
      }

      const deletedAccount = await accountServices.deleteAccountBymemberId(memberId);

      sendSuccessResponse(
        res,
        SUCCESS_MESSAGE.ACCOUNT_DELETED_SUCCESSFULLY ||"Account deleted successfully.",
        deletedAccount,
        200
      );
    } catch (error) {
      sendErrorResponse(
        res,
        error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        error.message,
        500
      );
    }
  },
};

module.exports = accountController;
