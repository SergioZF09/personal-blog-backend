import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './payload.entity';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) { };

    async validateUser(createUserDto: CreateUserDto) {
        try {

            const user = await this.userService.findOne(createUserDto.username);

            const matchUser = await bcrypt.compare(createUserDto.password, user?.password ?? "");

            if (user && matchUser) {
                const { password, ...result } = user;

                return result;
            }

            return null;
        } catch (error) {
            if (error instanceof Error) throw new InternalServerErrorException(error.message);
        }
    }

    login(user: User) {
        const payload: Payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
