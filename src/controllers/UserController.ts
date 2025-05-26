import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

import { UserService } from "../service/UserService";
import { UserDTO } from "../DTO/UserDTO";
import { BookingDTO } from "../DTO/BookingDTO";

/**
 * @class UserController
 * @description Gerencia as operações relacionadas a usuários, incluindo registro, busca e reserva de eventos.
 */
export class UserController {

    private userService = new UserService();

    /**
     * @method registerUser
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
     * @method eventBooking
     * Realiza o agendamento de um usuário para um evento.
     * Recebe os dados de agendamento (BookingDTO - userId e eventId) no corpo da requisição (`req.body`).
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o BookingDTO no corpo.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo o agendamento realizado (usuário atualizado) e uma mensagem de sucesso,
     * ou chama `next(error)` em caso de falha.
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
     * @method findAllUsers
     * Busca todos os usuários cadastrados.
     * (Normalmente uma rota protegida para administradores)
     *
     * @param {Request} req - O objeto de requisição do Express.
     * @param {Response} res - O objeto de resposta do Express.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo a lista de usuários
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
     * @method findUserById
     * Busca um usuário específico pelo seu ID.
     * O ID do usuário é passado como parâmetro na URL (`req.params.id`).
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o ID do usuário nos parâmetros da rota.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo o usuário encontrado,
     * ou chama `next(error)` se o usuário não for encontrado (tratado pelo service) ou em caso de outras falhas.
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
     * @method updateUser
     * Atualiza um usuário existente.
     * O ID do usuário a ser atualizado é passado como parâmetro na URL (`req.params.id`),
     * e os novos dados do usuário (UserDTO) são enviados no corpo da requisição (`req.body`).
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o ID do usuário nos parâmetros e UserDTO no corpo.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com a resposta JSON contendo o usuário atualizado e uma mensagem de sucesso,
     * ou chama `next(error)` em caso de falha.
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
     * @method deleteUser
     * Deleta um usuário existente.
     * O ID do usuário a ser deletado é passado como parâmetro na URL (`req.params.id`).
     * (Normalmente uma rota protegida para administradores)
     *
     * @param {Request} req - O objeto de requisição do Express, contendo o ID do usuário nos parâmetros da rota.
     * @param {Response} res - O objeto de resposta do Express.
     * @param {NextFunction} next - A função de middleware next do Express, usada para tratamento de erros.
     * @returns {Promise<Response>} Uma Promise que resolve com uma resposta JSON indicando sucesso na deleção,
     * ou chama `next(error)` em caso de falha.
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