import app from './app';
import config from './config';
import mongoose from 'mongoose';
import { errorLogger, infoLogger } from './shared/logger';
async function bootstrap() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    infoLogger.info(`Database connected successfully!!`);
    app.listen(config.PORT, () => {
      infoLogger.info(`App listening on port ${config.PORT}`);
    });
  } catch (error) {
    errorLogger.error(`internal server error ${error}`);
  }
}

bootstrap();
