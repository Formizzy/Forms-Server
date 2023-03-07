import mongoose from 'mongoose';
import { environment } from '../config.js';
import { masterDbSchemas } from './schemas/index.js';

// Build the connection string
const dbURI = `mongodb://${environment.user}:${encodeURIComponent(environment.password)}@${environment.host
  }:${environment.dbPort}/test?authSource=admin&w=1`;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
  minPoolSize: environment.minPoolSize,
  maxPoolSize: environment.maxPoolSize
};

function connectDB() {
  return new Promise((resolve, reject) => {
    const mongoURL = dbURI;
    mongoose
      .connect(mongoURL, mongoOptions)
      .then((conn) => {
        console.log('connected to mongoose');
        resolve(conn);
      })
      .catch((error) => reject(error));
    mongoose.set('strictQuery', true);
  });
}

export const dbConn = await connectDB();

export const switchDB = async (dbName, dbSchema) => {
  //rename this mongoose to dbConn
  if (dbConn.connection.readyState === 1) {
    const db = await dbConn.connection.useDb(dbName, { useCache: true });

    // Prevent from schema re-registration
    if (!Object.keys(db.models).length) {
      dbSchema.forEach((schema, modelName) => {
        db.model(modelName, schema);
      });
    }
    return db;
  }
  throw new Error('error switching db');
};
switchDB('masterDB', masterDbSchemas)



/**
 * @return model from mongoose
 */
export const getDBModel = async (db, modelName) => {
  return db.model(modelName)
}