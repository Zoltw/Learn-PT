import express from 'express';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes';
import promptRoutes from './routes/promptRoutes';
import { accessControl, authenticateToken, invalidRoute, notImplemented } from './utils/middlewares';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import health from './routes/health';
import { errorHandler } from './utils/errorHandler';

const app = express();

config();

const mongoUrl = process.env.MONGO_URL;
app.use(
  session({
    secret: process.env.MONGO_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl,
      collectionName: 'sessions',
      ttl: 3600,
    }),
  }),
);

app.use(express.json());
app.use(accessControl);
app.use('/health', health);
app.use('/v1/users', userRoutes);
app.use('/v1/chat', promptRoutes);
app.use(errorHandler);
app.use(invalidRoute);
app.use(notImplemented);

export default app;
