import dotenv from "dotenv";
dotenv.config();

const ENV = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI as string,
};

export default ENV;
