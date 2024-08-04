import mongoose from 'mongoose';
// import  process  from 'process';

const MONGODB_URI = 'mongodb+srv://new-user-49:new-user-49@cluster0.qzrap9v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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