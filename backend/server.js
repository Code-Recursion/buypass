const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const PORT = process.env.PORT;
const hostname = "localhost";

app.listen(PORT, () => {
  console.log(`server is started on http://${hostname}:${PORT}`);
});
