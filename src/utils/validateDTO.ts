import { validate } from "class-validator";

import { HttpException } from "../error/HttpException"

export default async function validateDTO(dto: Object) {
    const error = await validate(dto, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (error.length > 0) {
    throw new HttpException(400, "Invalid JSON");
  }

}