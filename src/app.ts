import http from 'http';

import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { knex } from "./config/db"

import { routes } from './routes';
import { ResponseError } from 'utils/responseError';
import { errorHandler } from 'middlewares/errorHandler';

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
    methods: 'GET'
  }),
);

knex.raw("SELECT 1")
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(() => {
    console.error('Unable to connect to the database');
  });

app.use((req, res, next) => {
  console.log('----------------------');
  console.log(`New Request, Target: ${req.method} - ${req.baseUrl}`);
  next();
});

app.use(routes);

app.use((req, res, next) => {
  const error: ResponseError = new Error(
    `${req.method} ${req.originalUrl} not found`,
  );
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

const APP_PORT = process.env.PORT || 4000;
const APP_HOST = process.env.HOST || 'localhost';

const server = http.createServer(app);

const setupServer = (): void => {
  server.listen(APP_PORT, () =>
    console.log(`Server started at ${APP_HOST}:${APP_PORT}`),
  );
}

setupServer();

export { app };