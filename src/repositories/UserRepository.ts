import { User } from "../models/User";
import { AppDataSource } from "../db_config/AppDataSource";

export const userRepository = AppDataSource.getRepository(User);