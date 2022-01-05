const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const PORT = process.env.PORT;
const hostname = "localhost";

const server = app.listen(PORT, () => {
  console.log(`server is started on http://${hostname}:${PORT}`);
});

//Handleing Unhandled Promise
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
