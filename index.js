const express  = require("express");
require('dotenv').config()
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const checkOrder = require("./helpers/checkOrder");
const port = process.env.PORT
const app = express();

const route = require("./routes/client/index.route");
const database = require("./configs/database");

// kết nối database
database.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Hàm tự dộngd hủy khi quá 5p
checkOrder.checkAndCancelOrderExpireOrder();

// Flash
// app.use(express.cookieParser("HFEHFJFSHF"));
app.use(cookieParser("HFJNDJFKDKFK"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End flash

// Set up pug
app.set('views', './views');
app.set('view engine', 'pug');

// Nhúng file tĩnh
app.use(express.static('public'));

// router
route(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})