import { validate } from "class-validator";

import { UserDTO } from "../DTO/UserDTO";
import { userRepository } from "../repositories/UserRepository";
import { User } from "../models/User";
import { HttpException } from "../error/HttpException";
import { BookingDTO } from "../DTO/BookingDTO";
import { eventRepository } from "../repositories/EventRepository";

export class UserService {

    async cadUser(userDTO: UserDTO): Promise<User> {
        
        const error = await validate(userDTO);

        if (error.length > 0) {
            throw new HttpException(400, "Invalid json");
        }

        const newUser = userRepository.create({
            name: userDTO.name,
            profilePick: userDTO.profilePick,
            role: userDTO.role
        });

        newUser.setEmail(userDTO.getEmail());
        await newUser.setPassword(userDTO.getPassword());

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
        
        const error = await validate(userDTO);

        if (error.length > 0) {
            throw new HttpException(400, "Invalid json");
        }

        const user = await userRepository.findOneBy({id});

        if (!user) {
            throw new HttpException(404, `User whith id ${id} not found`)
        }

        user.name = userDTO.name;
        user.profilePick = userDTO.profilePick;
        user.role = userDTO.role;
        user.setEmail(userDTO.getEmail());
        await user.setPassword(userDTO.getPassword());

        return userRepository.save(user);

    }

    async eventBooking(bookingDTO: BookingDTO) {

        const error = await validate(bookingDTO);
        
        if (error.length > 0) {
            throw new HttpException(400, "Invalid json");
        }

        const user = await userRepository.findOne({
            where: { id: bookingDTO.eventId },
            relations: ["user"] 
        });

        if (!user) {
            throw new HttpException(404, `User whith id ${bookingDTO.userId} not fuond`);
        }

        const event = await eventRepository.findOneBy({ id: bookingDTO.eventId });

        if (!event) {
            throw new HttpException(404, `Event whith id ${bookingDTO.eventId} not fuond`);
        }

        user.event?.push(event);

        return userRepository.save(user);

    }

    async deleteUser(id: string) {
        
        const user = await userRepository.findOneBy({id});

        if (!user) {
            throw new HttpException(404, `User whith id ${id} not fuond`);
        }

        return userRepository.delete(user.id);

    }

}
