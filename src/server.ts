import app from './app';
import config from './config';
import mongoose from 'mongoose';
import { errorLogger, infoLogger } from './shared/logger';
async function bootstrap() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    console.log(`Database connected successfully!!`);
    app.listen(config.PORT, () => {
      infoLogger.info(`App listening on port ${config.PORT}`);
    });
  } catch (error) {
    errorLogger.error(error);
  }
}

bootstrap();
