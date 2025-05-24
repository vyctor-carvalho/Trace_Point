import { validate } from "class-validator";

import { HttpException } from "../error/HttpException"

export default async function validateRequestBody(dto: Object) {
  if (!dto || typeof dto !== "object") {
    throw new HttpException(400, "Invalid request body");
  }

  try {
    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new HttpException(400, "Invalid JSON format or missing fields");
    }
  } catch (error) {
    throw new HttpException(400, "Invalid request format");
  }
}