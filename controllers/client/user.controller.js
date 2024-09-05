const Account = require("../../models/account.model");
const md5 = require("md5");

//[GET] /user/login
module.exports.login = (req, res) => {
    res.render("client/pages/user/login", {
       pageTitle: "Đăng nhập"
    });
}

//[POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const emailExist = await Account.findOne({
        email: req.body.email,
    })
    if(!emailExist){
        // alert("Email đã tồn tại!");
        req.flash("error", "Tài khoản hoặc mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }

    if(emailExist.password !== md5(req.body.password)){
        req.flash("error", "Tài khoản hoặc mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }

    if(emailExist.status !== "active"){
        req.flash("error", "Tài khoản đã bị khóa!");
        res.redirect("back");
        return;
    }

    res.cookie("token", emailExist.token);
    res.redirect("/");
}

//[GET] /user/register
module.exports.register = (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký"
     });
}

//[POST] /user/register
module.exports.registerPost = async (req, res) => {
    // console.log(req.body);
    const emailExist = await Account.findOne({
        email: req.body.email,
    })
    if(emailExist){
        // alert("Email đã tồn tại!");
        res.redirect("back");
        return;
    }

    req.body.balance = 100000;

    req.body.password = md5(req.body.password);
    const account = new Account(req.body);

    account.save();

    res.redirect("/user/login");
}


//[GET] /user/logout
module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}