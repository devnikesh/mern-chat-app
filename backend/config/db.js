// Connect the Database

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`Connected MongoDB succesfully! ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error Occured: ${err}`);
    process.exit();
  }
};

module.exports = connectDB;
