import { Body, Controller, Get, Post, Redirect, Render, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('login-submit')
    @Redirect('adminpanel')
    async login(@Body() loginDto: LoginDto, @Res({passthrough:true}) response: Response) {
        const result = await this.userService.login(loginDto);
        await response.cookie("auth-token", {auth : result});
        console.log(result);
        
        return console.log("true");
            
    }

    @Get("login")
    @Render("login")
    async renderLogin(){}
}
