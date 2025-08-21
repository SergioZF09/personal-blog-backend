import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Payload } from './payload.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { };

    async validateUser(loginDto: LoginDto) {
        try {
            const user = await this.userService.findOne(loginDto.username);

            if (!user) return null;

            const matchPassword = await bcrypt.compare(loginDto.password, user.password);

            if (matchPassword) {
                const payload: Payload = {
                    id: user.id,
                    username: user.username,
                    roles: user.roles,
                };
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }
        } catch (error) {
            if (error instanceof Error) throw new InternalServerErrorException(error.message);
        }
    }
}
