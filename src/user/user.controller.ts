import { Controller, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserGetByIDRequestDTO } from './dto/user_getByID_request';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // URL: http://localhost:3000/users/getUser/:id
    @Post('getUser/:id')
    async getUserByID(
        @Param('id') _id: string,
        @Body() body: { name: string, email: string },
        @Res() res: Response
    ) {
        try {
            const user = await this.userService.getUserByID({ _id, body });
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                status: false,
                message: 'Failed to retrieve user',
                error: error.message,
            });
        }
    }
}

