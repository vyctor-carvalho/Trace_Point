import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

import { UserService } from "../service/UserService";
import { UserDTO } from "../DTO/UserDTO";
import { BookingDTO } from "../DTO/BookingDTO";
import existsValidator from "../utils/ExistsValidator";

export class UserController {

    private userService = new UserService();

    /**
     * Registra um novo usuário.
     * Recebe os dados do usuário (UserDTO) no corpo da requisição.
     *
     * @param req - O objeto de requisição do Express, contendo o UserDTO no corpo.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo o usuário registrado e uma mensagem de sucesso,
     * ou chama `next` com um erro em caso de falha.
     */
    async registerUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userDTO = plainToInstance(UserDTO, req.body);

            const user = await this.userService.cadUser(userDTO);

            return res.status(201).json({
                message: "User registered",
                data: user
            });

        } catch (error) {
            next(error);
        }
    }

    /**
     * Realiza o agendamento de um usuário para um evento.
     * Recebe os dados de agendamento (BookingDTO - userId e eventId) no corpo da requisição.
     *
     * @param req - O objeto de requisição do Express, contendo o BookingDTO no corpo.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo o agendamento realizado e uma mensagem de sucesso,
     * ou chama `next` com um erro em caso de falha.
     */
    async eventBooking(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const bookingDTO = plainToInstance(BookingDTO, req.body);

            const eventBooked = await this.userService.eventBooking(bookingDTO);

            return res.status(200).json({
                message: "Event booked",
                data: eventBooked
            });

        } catch (error) {
            next(error);
        }
    }

    /**
     * Busca todos os usuários cadastrados.
     * (Normalmente uma rota protegida para administradores)
     *
     * @param req - O objeto de requisição do Express.
     * @param res - O objeto de resposta do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo a lista de usuários
     * ou uma mensagem caso nenhum usuário seja encontrado.
     */
    async findAllUsers(req: Request, res: Response): Promise<Response> {

        const users = await this.userService.getUsers();

        if (users.length === 0) {
            return res.status(200).json({
                message: "No users found"
            });
        }

        return res.status(200).json({ users });

    }

    /**
     * Busca um usuário específico pelo seu ID.
     * O ID do usuário é passado como parâmetro na URL.
     * (Normalmente uma rota protegida para administradores ou para o próprio usuário)
     *
     * @param req - O objeto de requisição do Express, contendo o ID do usuário nos parâmetros da rota.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo o usuário encontrado,
     * ou chama `next` com um erro (ex: usuário não encontrado, tratado pelo service/error handler).
     */
    async findUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;

            const user = await this.userService.getUserById(userId);

            return res.status(200).json({ user });

        } catch (error) {
            next(error);
        }
    }

    /**
     * Atualiza um usuário existente.
     * O ID do usuário a ser atualizado é passado como parâmetro na URL,
     * e os novos dados do usuário (UserDTO) são enviados no corpo da requisição.
     *
     * @param req - O objeto de requisição do Express, contendo o ID do usuário nos parâmetros e UserDTO no corpo.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com a resposta JSON contendo o usuário atualizado e uma mensagem de sucesso,
     * ou chama `next` com um erro em caso de falha (ex: usuário não encontrado).
     */
    async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const userId = req.params.id;

            const userDTO = plainToInstance(UserDTO, req.body);

            const updatedUser = await this.userService.putUser(userId, userDTO);

            return res.status(200).json({
                message: "User updated",
                data: updatedUser
            });

        } catch (error) {
            next(error);
        }
    }

    /**
     * Deleta um usuário existente.
     * O ID do usuário a ser deletado é passado como parâmetro na URL.
     * (Normalmente uma rota protegida para administradores)
     *
     * @param req - O objeto de requisição do Express, contendo o ID do usuário nos parâmetros da rota.
     * @param res - O objeto de resposta do Express.
     * @param next - A função de middleware next do Express.
     * @returns Uma Promise que resolve com uma resposta JSON indicando sucesso na deleção,
     * ou chama `next` com um erro em caso de falha (ex: usuário não encontrado).
     */
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = req.params.id;

            await this.userService.deleteUser(id);

            return res.status(200).json({
                message: "User deleted successfully"
            });
            
        } catch (error) {
            next(error);
        }
    }

}
