const Account = require("../../models/account.model");

module.exports.loginPost = async (req, res, next) => {
    const token =  req.cookies.token;

    const myAccount = await Account.findOne({
        token: token,
        deleted: false
    })

    if(myAccount){
        res.locals.myAccount = myAccount;
    }
    next();
}