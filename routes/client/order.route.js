const express = require("express")
const router = express.Router();

const controller = require("../../controllers/client/order.controller");

router.get("/", controller.index);

router.post("/create/:ticketId", controller.create);

router.get("/cancel/:ticketId", controller.cancelTicket);

router.post("/cancel/:ticketId", controller.cancelTicketPost);

router.get("/confirm/:ticketId", controller.confirmTicket);

router.post("/confirm/:ticketId", controller.confirmTicketPost);

module.exports = router;