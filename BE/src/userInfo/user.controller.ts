import { Controller, Get, Post, Body, Param, Query, Res, HttpStatus, HttpCode, Render } from '@nestjs/common';
import { UserInsertRequestDTO } from './dto/user_register_request';
import { UserInfoLoginRequestDTO } from './dto/user_login_request';
import { UserInfoForGotRequestDTO } from './dto/user_forgot_request';
import { UserInfoService } from './user.service';

//Url: http://localhost:3000/users
@Controller('usersInfo')
export class UserInfoController {
    constructor(private readonly userService: UserInfoService) { }

    //Url: http://localhost:3000/users/RegisterUser
    @Post('RegisterUser')
    async RegisterUser(@Body() body: UserInsertRequestDTO, @Res() res: any) {
        try {
            body = { ...body, role: 'user' }
            const responseDTO = await this.userService.RegisterUser(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //Url: http://localhost:3000/users/LoginUser
    @Post('LoginUser')
    async LoginUser(@Body() body: UserInfoLoginRequestDTO, @Res() res: any) {
        try {
            const responseDTO = await this.userService.LoginUser(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }

    }

    //Url: http://localhost:3000/users/ForgotPassword
    @Post('ForgotPassword')
    async ForGotPass(@Body() body: UserInfoForGotRequestDTO, @Res() res: any) {
        try {
            const responseDTO = await this.userService.ForGotPass(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }





}
