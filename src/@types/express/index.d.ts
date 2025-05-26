/*
 * Declaração global para estender a interface Request do Express.
 * Adiciona a propriedade `user` ao objeto de requisição, permitindo 
 * que os middlewares adicionem informações do token à requisição.
 */
import { TokenPayload } from "../../utils/TokenManager";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}