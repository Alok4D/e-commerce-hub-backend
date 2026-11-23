import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import cookieParser from 'cookie-parser';
import config from './app/config';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
      config.client_url,
    ].filter(Boolean) as string[],
    credentials: true,
  }),
);

// application routes
app.use('/api/v1', router);

const rootHandler = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '🚀 Nexora E-Commerce Hub API Server is Active & Running!',
    timestamp: new Date().toISOString(),
  });
};

app.get('/', rootHandler);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
