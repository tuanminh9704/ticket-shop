const Ticket = require("../../models/ticket.model");
 
module.exports.index = async (req, res) => {
    const tickets = await Ticket.find({
        deleted: false,
    })

    // console.log(tickets);

    res.render("client/pages/booking/index", {
        pageTitle: "Danh sách vé",
        tickets: tickets
    });
}