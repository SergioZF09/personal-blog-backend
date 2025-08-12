import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { AccessTokenDto } from './dto/token.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService) { };

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register', description: 'You can register to login.' })
    @ApiCreatedResponse({ type: User })
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login', description: 'You can login to use the services.' })
    @ApiBody({ type: LoginDto })
    @ApiOkResponse({ type: AccessTokenDto })
    login(@Request() req) {
        return this.authService.login(req.user);
    }

}
