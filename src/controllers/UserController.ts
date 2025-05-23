import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { UserService } from "../service/UserService";
import { UserDTO } from "../DTO/UserDTO";
import { BookingDTO } from "../DTO/BookingDTO";

export class UserController {

    private userService = new UserService();

    async registerUser(req: Request, res: Response): Promise<Response> {
        
        const userDTO = plainToInstance(UserDTO, req.body);

        const user = await this.userService.cadUser(userDTO);

        return res.status(201).json({
            message: "User registered",
            data: user
        });
        
    }

    async findAllUsers(req: Request, res: Response): Promise<Response> {

        const users = await this.userService.getUsers();

        if (users.length === 0) {
            return res.status(200).json({
                message: "No users found"
            })
        }

        return res.status(200).json({ users });

    }

    async eventBooking(req: Request, res: Response): Promise<Response> {
        
        const bookingDTO = plainToInstance(BookingDTO, req.body);

        const eventBooked = await this.userService.eventBooking(bookingDTO);

        return res.status(200).json({
            message: "Event booked",
            data: eventBooked
        })

    }

    async updateUser(req: Request, res: Response): Promise<Response> {

        const userId = req.params.id;

        const userDTO = plainToInstance(UserDTO, req.body);

        const updatedUser = await this.userService.putUser(userId, userDTO);

        return res.status(200).json({
            message: "User updated",
            data: updatedUser
        });

    }

    async deleteUser(req: Request, res: Response) {

        const id = req.params.id;

        await this.userService.deleteUser(id);

        return res.status(200).json({
            message: "User deleted successfully"
        });

    }

}