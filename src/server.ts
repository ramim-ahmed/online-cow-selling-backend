import app from './app';
import config from './config';
import mongoose from 'mongoose';
async function bootstrap() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    console.log(`Database connected successfully!!`);
    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
