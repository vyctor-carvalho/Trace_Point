import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.SYSTEM_API_PORT || 3000; 

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "root";
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
export const DB_NAME = process.env.DB_NAME || "trece_point";

export const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";
export const REFRESH_SECRET = process.env.REFRESH_SECRET || "my_security_refresh_token";
export  const TOKEN_EXPIRES_IN = Number(process.env.TOKEN_EXPIRES_IN) || 3600
export const REFRESH_TOKEN_EXPIRES_IN = Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 604800
