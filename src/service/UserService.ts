import { hash } from "bcrypt"

import { User } from "../models/User";
import { userRepository } from "../repositories/UserRepository";
import { EventService } from "../service/EventService";
import { UserDTO } from "../DTO/UserDTO";
import { BookingDTO } from "../DTO/BookingDTO";
import validateRequestBody from "../utils/ValidateRequestBody";
import existsValidator from "../utils/ExistsValidator";
import { HttpException } from "../error/HttpException";

/*
 * Serviço de gerenciamento de usuários.
 * Responsável por criar, buscar, reservar (eventos) e deletar usuários.
 */
export class UserService {


    private eventService = new EventService();

    /**
     * Cadastra um novo usuário.
     * Valida o DTO do usuário, verifica se o email já está em uso e,
     * se tudo estiver correto, cria e salva o novo usuário com a senha hasheada.
     *
     * @param userDTO - O Data Transfer Object contendo os dados do novo usuário.
     * @returns Uma Promise que resolve para a entidade User recém-criada e salva.
     * @throws HttpException Se a validação do DTO falhar (via `validateRequestBody`) ou se o email já estiver em uso.
     */
    async cadUser(userDTO: UserDTO): Promise<User> {
        
        await validateRequestBody(userDTO);

        const userExistis = await this.getUserByEmail(userDTO.getEmail());

        if (userExistis) {
            throw new HttpException(400, "Email is already in use")
        }

        const newUser = userRepository.create({
            name: userDTO.name,
            profilePick: userDTO.profilePick,
            role: userDTO.role,
            userLogin: {
                email: userDTO.getEmail(),
                password: await hash(userDTO.getPassword(), 10)
            }
        });

        return userRepository.save(newUser);

    }

    /**
     * Retorna uma lista de todos os usuários cadastrados.
     *
     * @returns Uma Promise que resolve para um array de entidades User.
     */
    async getUsers(): Promise<User[]> {
        return await userRepository.find();
    }

    /**
     * Busca um usuário específico pelo seu ID.
     *
     * @param id - O ID (UUID) do usuário a ser buscado.
     * @returns Uma Promise que resolve para a entidade User encontrada.
     * @throws HttpException Se o usuário com o ID fornecido não for encontrado (via `existsValidator`).
     */
    async getUserById(id: string) {

        const user = await userRepository.findOneBy({id});

        existsValidator(user, "User");

        return user;
    }

    /**
     * Busca um usuário específico pelo seu endereço de email.
     *
     * @param email - O email do usuário a ser buscado.
     * @returns Uma Promise que resolve para a entidade User encontrada ou null se não existir.
     * (Este método em si não lança HttpException se o usuário não for encontrado, retorna null).
     */
    async getUserByEmail(email: string) {
        return await userRepository.findOne({ 
            where: { 
                userLogin: { 
                    email: email 
                }
            }
        })
    }

    /**
     * Atualiza um usuário existente.
     * Valida o DTO do usuário, busca o usuário a ser atualizado,
     * e atualiza seus dados, incluindo o hash da nova senha.
     *
     * @param id - O ID (UUID) do usuário a ser atualizado.
     * @param userDTO - O Data Transfer Object contendo os novos dados do usuário.
     * @returns Uma Promise que resolve para a entidade User atualizada e salva.
     * @throws HttpException Se a validação do DTO falhar (via `validateRequestBody`),
     * ou se o usuário a ser atualizado não for encontrado (via `existsValidator`).
     */
    async putUser(id: string, userDTO: UserDTO): Promise<User> {
        
        await validateRequestBody(userDTO);

        const user = await userRepository.findOneBy({id});

        existsValidator(user, "User");

        user.name = userDTO.name;
        user.profilePick = userDTO.profilePick;
        user.role = userDTO.role;
        user.setEmail(userDTO.getEmail());
        user.setPassword(await hash(userDTO.getPassword(), 10));

        return userRepository.save(user);

    }

    /**
     * Realiza a inscrição (booking) de um usuário em um evento.
     * Valida o DTO de booking, busca o usuário e o evento,
     * e verifica se o usuário já não está inscrito no evento antes de adicionar a relação.
     *
     * @param bookingDTO - O Data Transfer Object contendo o userId e eventId.
     * @returns Uma Promise que resolve para a entidade User atualizada com o novo evento na sua lista.
     * @throws HttpException Se a validação do DTO de booking falhar (via `validateRequestBody`),
     * se o usuário ou o evento não forem encontrados (via `existsValidator` ou `eventService.getEventById` que pode retornar null e ser validado),
     * ou se o usuário já estiver inscrito no evento.
     */
    async eventBooking(bookingDTO: BookingDTO): Promise<User> {

        await validateRequestBody(bookingDTO);

        const user = await userRepository.findOne({
            where: { id: bookingDTO.userId },
            relations: {
                event: true
            }
        });

        existsValidator(user, "User");

        const event = await this.eventService.getEventById(bookingDTO.eventId)

        existsValidator(event, "Event");

        if (!user.event) {
            user.event = [];
        }

        const alreadyBooked = user.event.some(e => e.id === event.id);

        if (alreadyBooked) {
            throw new HttpException(400, "User already booked in this event");
        }

        user.event.push(event);

        return userRepository.save(user);

    }

    /**
     * Deleta um usuário específico pelo seu ID.
     * Verifica se o usuário existe antes de tentar deletá-lo.
     *
     * @param id - O ID (UUID) do usuário a ser deletado.
     * @returns Uma Promise que resolve quando a operação de deleção é concluída.
     * @throws HttpException Se o usuário a ser deletado não for encontrado (via `existsValidator`).
     */
    async deleteUser(id: string): Promise<void> {
        
        const user = await userRepository.findOneBy({id});

        existsValidator(user, "User");

        userRepository.delete(user.id);

    }

}
