import { hash } from "bcrypt"

import { User } from "../models/User";
import { userRepository } from "../repositories/UserRepository";
import { EventService } from "../service/EventService";
import { UserDTO } from "../DTO/UserDTO";
import { BookingDTO } from "../DTO/BookingDTO";
import validateRequestBody from "../utils/ValidateRequestBody";
import existsValidator from "../utils/ExistsValidator";

export class UserService {

    private eventService = new EventService();

    async cadUser(userDTO: UserDTO): Promise<User> {
        
        await validateRequestBody(userDTO);

        const newUser = userRepository.create({
            name: userDTO.name,
            profilePick: userDTO.profilePick,
            role: userDTO.role
        });

        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(await hash(userDTO.getPassword(), 10));

        return userRepository.save(newUser);

    }

    async getUsers(): Promise<User[]> {
        return await userRepository.find();
    }

    async getUserById(id: string) {
        return await userRepository.findOneBy({id})
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
        await user.setPassword(userDTO.getPassword());

        return userRepository.save(user);

    }

    async eventBooking(bookingDTO: BookingDTO): Promise<User> {

        await validateRequestBody(bookingDTO);

        const user = await userRepository.findOne({
            where: { id: bookingDTO.eventId },
            relations: ["user"] 
        });

        existsValidator(user, "User");

        const event = await this.eventService.getEventById(bookingDTO.eventId)

        existsValidator(event, "Event");

        user.event?.push(event);

        return userRepository.save(user);

    }

    async deleteUser(id: string): Promise<void> {
        
        const user = await userRepository.findOneBy({id});

        existsValidator(user, "User");

        userRepository.delete(user.id);

    }

}
