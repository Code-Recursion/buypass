const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());

// importing router
const ProductRoutes = require("./routes/productRoute");
const UserRoutes = require("./routes/userRoute");
app.use("/api/v1", ProductRoutes);
app.use("/api/v1", UserRoutes);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
