const mongoose = require("mongoose");

const connectDatabase = () => {
  const DB_URI = process.env.DB_URI;

  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongodb connected with ${data.connection.host}`);
    })
    // catch is covered in unhandled Promise Rejection
};

module.exports = connectDatabase;
