import { hash } from "bcrypt"

import { User } from "../models/User";
import { userRepository } from "../repositories/UserRepository";
import { EventService } from "../service/EventService";
import { UserDTO } from "../DTO/UserDTO";
import { BookingDTO } from "../DTO/BookingDTO";
import validateRequestBody from "../utils/ValidateRequestBody";
import existsValidator from "../utils/ExistsValidator";
import { HttpException } from "../error/HttpException";

export class UserService {

    private eventService = new EventService();

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

    async getUsers(): Promise<User[]> {
        return await userRepository.find();
    }

    async getUserById(id: string) {

        const user = await userRepository.findOneBy({id});

        existsValidator(user, "User");

        return user;
    }

    async getUserByEmail(email: string) {
        return await userRepository.findOne({ 
            where: { 
                userLogin: { 
                    email: email 
                }
            }
        })
    }

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

    async deleteUser(id: string): Promise<void> {
        
        const user = await userRepository.findOneBy({id});

        existsValidator(user, "User");

        userRepository.delete(user.id);

    }

}
