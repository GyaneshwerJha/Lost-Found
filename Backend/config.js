import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const mongoURL = process.env.MONGODB_URL;