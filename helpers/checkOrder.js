const cron = require("node-cron");
const Order = require("../models/order.model");

module.exports.checkAndCancelOrderExpireOrder = () => {
    cron.schedule('*/5 * * * *', async () => {
        const now = new Date();

        const expiresOrder = await Order.find({
            status: "pending",
            bookingTime: { $lt: new Date(now - 5*60*1000) }
        });
        expiresOrder.forEach(async (order) => {
            order.status = 'cancelled';
            await order.save();

          }); 
    })
}