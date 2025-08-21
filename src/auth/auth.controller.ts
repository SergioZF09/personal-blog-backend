import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { AccessTokenDto } from './dto/token.dto';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService) { };

    @Post('/register')
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register', description: 'You can register to login.' })
    @ApiCreatedResponse({ type: User })
    async register(@Body() registerDto: RegisterDto) {
        return await this.userService.create(registerDto);
    }

    @Post('/login')
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login', description: 'You can login to use the services with a token.' })
    @ApiOkResponse({ type: AccessTokenDto })
    async login(@Body() loginDto: LoginDto) {
        const token = await this.authService.validateUser(loginDto);

        if (!token) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

        return token;
    }

}
