import { Event } from "../models/Event";
import { AppDataSource } from "../db_config/AppDataSource";

export const eventRepository = AppDataSource.getRepository(Event);