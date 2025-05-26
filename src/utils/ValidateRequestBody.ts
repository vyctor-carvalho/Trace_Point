import { validate, ValidationError } from "class-validator"; // Adicionado ValidationError para tipagem
import { HttpException } from "../error/HttpException"; // Verifique o caminho

/**
 * @function validateRequestBody
 * @async
 * @description Valida um objeto DTO (Data Transfer Object) usando as regras do `class-validator`.
 * Lança uma `HttpException` se o DTO for inválido ou não atender aos critérios de validação.
 *
 * @param {Object} dto - O objeto DTO a ser validado.
 * @returns {Promise<void>} Uma Promise que resolve se a validação for bem-sucedida.
 * @throws {HttpException} Com status 400 se:
 * - O corpo da requisição (`dto`) for nulo ou não for um objeto.
 * - O DTO falhar na validação do `class-validator` (ex: campos ausentes, formato inválido).
 */
export default async function validateRequestBody(dto: Object): Promise<void> {
  if (!dto || typeof dto !== "object") {
    throw new HttpException(400, "Invalid request body: expected an object.");
  }

  // As opções whitelist e forbidNonWhitelisted ajudam a garantir que apenas propriedades definidas no DTO sejam aceitas.
  const errors: ValidationError[] = await validate(dto, {
    whitelist: true, // Remove propriedades não definidas no DTO
    forbidNonWhitelisted: true, // Lança erro se propriedades não definidas forem enviadas
  });

  if (errors.length > 0) {
    // Pode-se formatar os erros para serem mais específicos, se desejado.
    // Por agora, uma mensagem genérica.
    const errorMessages = errors.map(error => Object.values(error.constraints || {})).join(', ');
    throw new HttpException(400, `Invalid request body: ${errorMessages || "validation failed due to missing or invalid fields"}`);
  }
}