import mongooes from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDB = async () => {
  try {
    const connection = await mongooes.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
    console.log(`Connected to database: ${DB_NAME}`);
  } catch (error) {
    console.log("Error connecting to database: ", error.message);
    process.exit(1);
  }
}

export default connectDB;