const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB CONNECTED!", connect.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDb;
