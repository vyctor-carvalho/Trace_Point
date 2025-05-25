import { compare, hash } from "bcrypt";

import { TokenManager } from "../utils/TokenManager";
import existsValidator from "../utils/ExistsValidator";
import validateRequestBody from "../utils/ValidateRequestBody";
import { LoginInfoDTO } from "../DTO/wrappersDTO/LoginInfoDTO";
import { UserService } from "./UserService";
import { HttpException } from "../error/HttpException";

export class AuthService {


  private userService = new UserService();

  private tokenManager = new TokenManager();

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

        const accessToken = this.tokenManager.geneareAccessToken(payload);

        const refreshToken = this.tokenManager.generateRefreshToken(payload);

        return { accessToken, refreshToken, user };

    }

    async refreshAuthenticate(refreshToken: string) {

        const decoded = this.tokenManager.verifyRefreshToken(refreshToken);
        
        const payload = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        }

        return this.tokenManager.geneareAccessToken(payload);

    }

}