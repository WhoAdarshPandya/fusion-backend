import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = (): void => {
  connect(
    process.env.DB_URL!,
    {
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      err ? console.log(err) : console.log("db connected");
    }
  );
};
