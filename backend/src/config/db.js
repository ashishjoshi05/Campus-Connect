import mongoose from 'mongoose';

export const connectDB = async () => {
  if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('')) {
    console.log('⚠️  MongoDB URI not configured yet. Running server without database connection.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Warning: ${error.message}`);
  }
};


// import mongoose from 'mongoose';

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Database Connection Error: ${error.message}`);
//     process.exit(1);
//   }
// };