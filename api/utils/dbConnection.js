import mongoose from 'mongoose';
import { process } from 'node';

const MONGODB_URI =process.env.mongoUrl

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

let connection = null;

async function connectToDatabase() {
  if (connection) {
    return connection;
  }

  try {
    const mongooseInstance = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    
    connection = mongooseInstance.connection;
    
    console.log('Successfully connected to MongoDB');
    
    connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    
    process.on('SIGINT', async () => {
      if (connection) {
        await connection.close();
        console.log('MongoDB connection closed due to application termination');
        process.exit(0);
      }
    });

    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default connectToDatabase;