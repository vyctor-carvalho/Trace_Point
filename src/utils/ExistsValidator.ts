import { HttpException } from "../error/HttpException";

/**
 * @function existsValidator
 * @description Valida se um objeto existe (não é nulo ou indefinido).
 * Lança uma `HttpException` com status 404 se o objeto não existir.
 * Utiliza uma asserção de tipo (`asserts object`) para informar ao TypeScript
 * que o objeto é non-null após a chamada desta função (se ela não lançar erro).
 *
 * @param {Object | null | undefined} object - O objeto a ser verificado.
 * @param {string} [type="Object"] - Uma string descritiva do tipo do objeto (usada na mensagem de erro).
 * @param {string} [message="not found"] - Uma mensagem sufixo para o erro (usada na mensagem de erro).
 * @returns {void} Não retorna valor, mas afirma que `object` é non-null para o TypeScript.
 * @throws {HttpException} Com status 404 se `object` for nulo ou indefinido.
 */
export default function existsValidator(
    object: unknown, // Alterado para 'unknown' para melhor prática com 'asserts'
    type: string = "Object",
    message: string = "not found"
): asserts object { // Afirma que 'object' é truthy (não null/undefined) após esta chamada
    if (object === null || typeof object === 'undefined') {
        throw new HttpException(404, `${type} ${message}`);
    }
}