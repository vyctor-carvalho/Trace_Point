import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";

import { UserService } from "../service/UserService";
import { UserDTO } from "../DTO/UserDTO";
import { BookingDTO } from "../DTO/BookingDTO";
import existsValidator from "../utils/ExistsValidator";

export class UserController {

    private userService = new UserService();

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

    async findAllUsers(req: Request, res: Response): Promise<Response> {

        const users = await this.userService.getUsers();

        if (users.length === 0) {
            return res.status(200).json({
                message: "No users found"
            });
        }

        return res.status(200).json({ users });

    }

    async findUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;

            const user = await this.userService.getUserById(userId);

            return res.status(200).json({ user });

        } catch (error) {
            next(error);
        }
    }

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
