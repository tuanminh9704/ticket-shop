const Ticket = require("../../models/ticket.model");
const Account = require("../../models/account.model");
const Order = require("../../models/order.model");

// [GET] /order
module.exports.index = async (req, res) => {
    const myAccountId = res.locals.myAccount.id;
    const orders = await Order.find({
        user_id: myAccountId,
        status: { $in: ["pending", "confirmed"] }
    });
    
    for (const order of orders) {
        const ticketInfo = await Ticket.findOne({
            _id: order.ticket_id,
            deleted: false
        }).select("-status -deleted");
    
        const userInfo = await Account.findOne({
            _id: order.user_id,
            deleted: false,
        }).select("-password -token");

        order.ticketInfo = ticketInfo;
        order.userInfo = userInfo;
    }

    res.render("client/pages/order/index", {
        pageTitle: "Danh sách đơn hàng",
        orders: orders
    })
}

// [POST] /order/create
module.exports.create = async (req, res) => {
    const ticketId = req.params.ticketId;
    const myAccountId = res.locals.myAccount.id;

    await Ticket.updateOne({_id: ticketId}, {stock: req.body.newStock});  
    // console.log(req.body)

    const order = new Order({
        user_id: myAccountId,
        ticket_id: ticketId,
      });


    await order.save();

    res.redirect("back");
    // res.send("OK");
}

//[GET] /order/cancel/:ticketId
module.exports.cancelTicket = async (req, res) => {
    res.redirect("back");
}

//[POST] /order/cancel/:ticketId
module.exports.cancelTicketPost = async (req, res) => {
    const stock = parseInt(req.body.stock) + 1;
    // console.log(stock);
    const ticketId = req.params.ticketId;
    await Order.updateOne({_id: req.body.orderId}, {status: "cancelled"});
    await Ticket.updateOne({_id: ticketId}, {stock: stock});
    req.flash("success", "Hủy vé thành công!");
    res.redirect("back");
}

//[GET] /order/confirm/:ticketId
module.exports.confirmTicket = (req, res) => {
    res.redirect("back");
}

//[POST] /order/confirm/:ticketId
module.exports.confirmTicketPost = async (req, res) => {
    // console.log(req.body);
    const myAccountId = res.locals.myAccount.id;
    const myAccount = await Account.findOne({
        _id: myAccountId
    });
    const ticketPrice = parseInt(req.body.price);

    const newBalance = myAccount.balance - ticketPrice;
    // console.log(newBalance);

    await Order.updateOne({_id: req.body.orderId}, {status: "confirmed"});
    await Account.updateOne({_id: myAccountId}, {balance: newBalance});

    res.json({
        code: 200,
        message: "Success",
        newBalance: newBalance
    })
}

