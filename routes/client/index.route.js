const homeRouter = require("./home.route");
const bookingRouter = require("./booking.route");
const userRouter = require("./user.route");
const orderRouter = require("./order.route");

const authMiddleware = require("../../middlewares/client/auth.middleware");
const loginPostMiddleware = require("../../middlewares/client/user.middleware");


module.exports = (app) => {
    app.use(loginPostMiddleware.loginPost);

    app.use("/",  homeRouter);

    app.use("/booking", authMiddleware.auth, bookingRouter);

    app.use("/user", userRouter);

    app.use("/order",authMiddleware.auth, orderRouter);
}
