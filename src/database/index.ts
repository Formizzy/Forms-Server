import mongoose from 'mongoose';
import { db } from '../config';

// Build the connection string
const dbURI = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/${db.dbName}?authSource=admin&w=1`;

const options = {
  autoIndex: true,
  minPoolSize: db.minPoolSize, // Maintain up to x socket connections
  maxPoolSize: db.maxPoolSize, // Maintain up to x socket connections
  connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

mongoose.set('strictQuery', true);

// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => {
    console.log("CONNECTION ESTABLISHED")
  })
  .catch((e) => {
    console.log("ERROR : ", e)
  });

// CONNECTION EVENTS

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});

export const connection = mongoose.connection;
