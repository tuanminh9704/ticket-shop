module.exports.checkUser = (req, res, next) => {
    if(!req.body.fullName){
        req.flash("error", "Vui lòng không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.email){
        req.flash("error", "Vui lòng không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.password){
        req.flash("error", "Vui lòng không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.login = (req, res, next) => {

    if(!req.body.email){
        req.flash("error", "Vui lòng không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.password){
        req.flash("error", "Vui lòng không được để trống!");
        res.redirect("back");
        return;
    }

    // console.log("OK"); 2024

    next();
}

