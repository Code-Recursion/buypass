const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());

// importing router
const ProductRoutes = require("./routes/productRoute");
app.use("/api/v1", ProductRoutes);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
