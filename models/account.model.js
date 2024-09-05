const mongoose = require("mongoose");
const genarateHelper = require("../helpers/genarate");

const accountShema = new mongoose.Schema(
    {
        fullname: String,
        balance: Number,
        email: String,
        phoneNumber: Number,
        address: String,
        password: String,
        status: {
            type: String,
            default: "active"
        },
        token: {
            type: String,
            default: genarateHelper.stringRandom(30)
        },
        deleted: {
            type: Boolean,
            default: false
        }
    }
);

const Account = mongoose.model("Account", accountShema, "accounts");

module.exports = Account;