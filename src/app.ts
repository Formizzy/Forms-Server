import express from 'express';
import { Application } from 'express';
import dotenv from 'dotenv';
import "./database";  // initialize and connect with database
import routes from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const allowedOrigins = ['*', 'http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app: Application = express();

app.use(cors(options))

// body-parser
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
dotenv.config();

// routes
app.use('/', routes);

export default app;