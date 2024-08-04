import mongoose from 'mongoose';
import  process  from 'process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

let connection;

async function connectToDatabase() {


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
    

    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default connectToDatabase;