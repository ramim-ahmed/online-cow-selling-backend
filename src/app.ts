import { Application } from 'express';
import express from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import globalErrorHandler from './middlewares/globalErrorHandlers';
const app: Application = express();
import ApplicationRoutes from './routes';
app.use(cors());
// data parser middlware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes;
app.use('/api/v1', ApplicationRoutes);
// global error handler
app.use(globalErrorHandler);

// handle not found routes
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found!!',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found!!',
      },
    ],
  });
  next();
});

export default app;
