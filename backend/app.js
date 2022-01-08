const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

// importing router
const ProductRoutes = require("./routes/productRoute");
const UserRoutes = require("./routes/userRoute");
const OrderRoutes = require("./routes/orderRoute");

app.use("/api/v1", ProductRoutes);
app.use("/api/v1", UserRoutes);
app.use("/api/v1", OrderRoutes);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
