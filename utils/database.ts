import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  console.log('🚀 ~ connectToDB ~ MONGODB_URI:', process.env.MONGODB_URI, isConnected);
  if (isConnected) {
    console.log('MongoDB already connected!');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, { dbName: 'share_prompt' });
    isConnected = true;
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('MongoDB conection error!', error);
  }
};
