import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {

            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(createUserDto.password, salt);

            const userWithHashedPassword = {
                ...createUserDto,
                password: hash
            }

            const user = await this.userRepository.create(userWithHashedPassword);

            const userSaved = await this.userRepository.save(user)

            const { password, ...newUser } = userSaved;

            return newUser;
        } catch (error) {
            if (error instanceof Error) throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(username: string) {
        try {
            const user = await this.userRepository.findOne({ where: { username: username } });

            if (user) return user;
            return null;
        } catch (error) {
            if (error instanceof Error) throw new InternalServerErrorException(error.message);
        }
    }

}
