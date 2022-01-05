const express = require("express");
const app = express();
app.use(express.json());

// importing router
const ProductRoutes = require("./routes/productRoute");
app.use("/api/v1", ProductRoutes);
module.exports = app;
