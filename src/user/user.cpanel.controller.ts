import { Controller, Get, Post, Body, Param, Query, Res, HttpStatus, HttpCode, Render, Put, UseGuards, Req } from '@nestjs/common';
import { Response } from 'express';



import { UserService } from './user.service';


//Url: http://localhost:3000/users
@Controller('usersCpanel')
export class UserCpanelController {
  constructor(
    private readonly userService: UserService,

  ) { }



  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    req.logout();
    res.redirect('/auth/loginWeb');
  }

}
