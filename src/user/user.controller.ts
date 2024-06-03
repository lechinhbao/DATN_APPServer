import { Controller, Get, Post, Body, Param, Query, Res, HttpStatus, HttpCode, Render, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserGetByIDRequestDTO } from './dto/user_getByID_request';
//Url: http://localhost:3000/users
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    //Url: http://localhost:3000/users/RegisterUser


    @Post('getUser/:id')
    async getUserByID(@Param('id') _id: UserGetByIDRequestDTO, @Body() body: { name: string, email: string }, @Res() res: Response) {
        try {
            const user = await this.userService.GetUserByID({ _id, body });
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }




}
