import { sign, verify, JwtPayload } from "jsonwebtoken"; // Adicionado JwtPayload

import { UserRole } from "../models/enum/UserRole"; // Verifique o caminho
import { JWT_SECRET, REFRESH_SECRET, TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from "../config/EsportEnv"; // Verifique o caminho
import { HttpException } from "../error/HttpException"; // Verifique o caminho

/**
 * @interface TokenPayload
 * @description Define a estrutura do payload esperado nos tokens JWT.
 */
export interface TokenPayload extends JwtPayload { // Estende JwtPayload para incluir campos padrão do JWT
    /**
     * @property id
     * @description ID do usuário.
     */
    id: string;
    /**
     * @property role
     * @description Papel (role) do usuário.
     */
    role: UserRole;
    /**
     * @property email
     * @description Email do usuário.
     */
    email: string;
}

/**
 * @class TokenManager
 * @description Gerencia a criação e verificação de tokens JWT (Access e Refresh).
 */
export class TokenManager {

    /**
     * @method generateAccessToken
     * @description Gera um token de acesso JWT.
     *
     * @param {TokenPayload} payload - O payload a ser incluído no token.
     * @returns {string} O token de acesso JWT gerado.
     */
    public generateAccessToken(payload: TokenPayload): string {
        return sign(
            payload, 
            JWT_SECRET, 
            {
                expiresIn: TOKEN_EXPIRES_IN
            }
        );
    }

    /**
     * @method generateRefreshToken
     * @description Gera um token de atualização (refresh token) JWT.
     *
     * @param {TokenPayload} payload - O payload a ser incluído no token.
     * @returns {string} O refresh token JWT gerado.
     */
    public generateRefreshToken(payload: TokenPayload): string {
        return sign(
            payload,
            REFRESH_SECRET,
            {
                expiresIn: REFRESH_TOKEN_EXPIRES_IN
            }
        );
    }

    /**
     * @method verifyAccessToken
     * @description Verifica a validade de um token de acesso JWT.
     *
     * @param {string} token - O token de acesso a ser verificado.
     * @returns {TokenPayload} O payload decodificado do token se for válido.
     * @throws {HttpException} Com status 401 se o token for inválido ou expirado.
     */
    public verifyAccessToken(token: string): TokenPayload {
        try {
            return verify(
                token,
                JWT_SECRET            
            ) as TokenPayload;
        } catch(error: any) {
            // Captura erros do 'verify' (ex: TokenExpiredError, JsonWebTokenError)
            // e os encapsula em uma HttpException para tratamento padronizado.
            throw new HttpException(401, `Invalid or expired access token: ${error.message || 'verification failed'}`);
        }
    }

    /**
     * @method verifyRefreshToken
     * @description Verifica a validade de um refresh token JWT.
     *
     * @param {string} token - O refresh token a ser verificado.
     * @returns {TokenPayload} O payload decodificado do token se for válido.
     * @throws {HttpException} Com status 401 se o token for inválido ou expirado.
     */
    public verifyRefreshToken(token: string): TokenPayload {
        try {
            return verify(
                token,
                REFRESH_SECRET
            ) as TokenPayload;
        } catch (error: any) {
            throw new HttpException(401, `Invalid or expired refresh token: ${error.message || 'verification failed'}`);
        }
    }
}