import { compare } from "bcrypt";

import { TokenManager } from "../utils/TokenManager";
import existsValidator from "../utils/ExistsValidator";
import validateRequestBody from "../utils/ValidateRequestBody";
import { LoginInfoDTO } from "../DTO/wrappersDTO/LoginInfoDTO";
import { UserService } from "./UserService";
import { HttpException } from "../error/HttpException";

/**
 * Serviço de autenticação para usuários.
 * Gerencia login e renovação de tokens de acesso.
 */
export class AuthService {

    private userService = new UserService();

    private tokenManager = new TokenManager();

    /**
   * Autentica um usuário com base nas credenciais fornecidas.
   * Valida o corpo da requisição, busca o usuário pelo email,
   * compara a senha fornecida com a senha armazenada (hash) e,
   * se bem-sucedido, gera tokens de acesso e atualização.
   *
   * @param loginDTO - O Data Transfer Object contendo email e senha do usuário.
   * @returns Uma Promise que resolve para um objeto contendo o accessToken, refreshToken e os dados do usuário.
   * @throws HttpException Se a validação do DTO de login falhar (via `validateRequestBody`),
   * se o usuário não for encontrado (via `existsValidator` chamado internamente por `userService.getUserByEmail` ou aqui),
   * ou se a senha for inválida.
   */
    async authenticate(loginDTO: LoginInfoDTO) {

        await validateRequestBody(loginDTO);

        const user = await this.userService.getUserByEmail(loginDTO.email);

        existsValidator(user, "User", "email is invalid");

        if (!(await compare(loginDTO.password, user.getPassword()))) {
            throw new HttpException(401, "Invalid password");
        }

        const payload = {
            id: user.id,
            email: user.getEmail(),
            role: user.role
        }

        const accessToken = this.tokenManager.generateAccessToken(payload);

        const refreshToken = this.tokenManager.generateRefreshToken(payload);

        return { accessToken, refreshToken, user };

    }

   /**
   * Gera um novo token de acesso utilizando um refresh token válido.
   * Valida a existência do refresh token, verifica sua validade e,
   * se bem-sucedido, gera um novo token de acesso com base nos dados do refresh token.
   *
   * @param refreshToken - O refresh token string fornecido pelo cliente.
   * @returns Uma Promise que resolve para o novo accessToken.
   * @throws HttpException Se o refresh token não for fornecido (via `existsValidator`) ou for inválido (verificado por `tokenManager`).
   */
    async refreshAuthenticate(refreshToken: string) {

        existsValidator(refreshToken, "Refresh token", "is required");

        const decoded = this.tokenManager.verifyRefreshToken(refreshToken);
        
        const payload = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        }

        return this.tokenManager.generateAccessToken(payload);

    }

}