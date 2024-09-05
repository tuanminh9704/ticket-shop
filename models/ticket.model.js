const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  status: String,   
  thumbnail: String,
  stock: Number,
  deleted: {
    type: Boolean,
    default: false
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema, "tickets");

module.exports = Ticket;
