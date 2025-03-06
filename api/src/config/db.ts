import mongoose from 'mongoose';
import config from './config';

const db = async () => {
  await mongoose.connect(config.mongoUrl as string).then(() => {
    console.log('Database connection successfully!');
  }).catch((error)=>{
    console.log('Error in connecting to the Mongo Database: ', error);
  });
}

export default db;
