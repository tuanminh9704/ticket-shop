const mongoose = require("mongoose");

const orderShema = new mongoose.Schema(
    {
        user_id: String,
        ticket_id: String,
        // ticketInfo: {
        //   title: String,
        //   price: Number,
        //   thumbnail: String,  
        // },
        // userInfo: {
        //   fullName: String,
        //     email
        // },
        bookingTime: {
            type: Date,
            default: Date.now
        },
        status: { 
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'], 
            default: 'pending'
        },
        paymenDetail: Number

    }
)

const Order = mongoose.model("Order", orderShema, "orders");

module.exports = Order;