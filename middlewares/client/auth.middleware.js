const Account = require("../../models/account.model");

module.exports.auth = async (req, res, next) => {
    if(!req.cookies.token){
        res.redirect(`/user/login`);
    }
    else{
        const account = await Account.findOne({
            token: req.cookies.token,
            deleted: false
        })

        if(!account){
            res.redirect("/user/login");
        }
        else{
            next();
        }
    }
}