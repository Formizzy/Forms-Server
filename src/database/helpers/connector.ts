import mongoose from "mongoose";
import { db } from '../../config';

// Build the connection string
const connectionURI = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}?authSource=admin`

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
  minPoolSize: db.minPoolSize,
  maxPoolSize: db.maxPoolSize
};

mongoose.set('strictQuery', true);


export const connectDB = async function () : Promise<typeof mongoose> {
    try {
        const connectionUsingURI = await mongoose.connect(connectionURI, options);
        return connectionUsingURI;
    }
    catch (error: any) {
        return error;
    }
}