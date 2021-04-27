//DB connection
const mongoose = require("mongoose");
const DB_URI =
  "mongodb+srv://vivek:vivek@cluster0.1spzz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`Mongoose Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
