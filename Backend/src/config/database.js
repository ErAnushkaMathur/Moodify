const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config()

function connectToDB() {
  mongoose.connect(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  })
}


module.exports = connectToDB;