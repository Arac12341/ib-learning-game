import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MongoDB connection error: No MONGO_URI found in environment variables');
  throw new Error('Please add your Mongo URI to the .env file');
}

let isConnected = false; // To track the MongoDB connection state

export const connectMongo = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    console.log('Connecting to MongoDB...');

    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    
    if (isConnected) {
      console.log('MongoDB connected successfully');
    } else {
      console.error('MongoDB connected but readyState is not 1');
    }
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('MongoDB connection failed');
  }
};
