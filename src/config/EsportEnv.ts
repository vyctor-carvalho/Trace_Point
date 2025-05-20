import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.SYSTEM_API_PORT || 3000; 

export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "root";
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
export const DB_NAME = process.env.DB_NAME || "angel_visitor";

export const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";