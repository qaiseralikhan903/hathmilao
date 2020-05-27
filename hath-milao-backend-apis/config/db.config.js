import mongoose from "mongoose";
mongoose.set("useCreateIndex", true);

const connectDb = () => {
  return mongoose.connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useFindAndModify: false
  });
};

export default connectDb;
