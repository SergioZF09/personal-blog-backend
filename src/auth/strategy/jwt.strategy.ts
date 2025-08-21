import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SECRET_KEY } from '../constants/jwt-key';
import { Payload } from '../payload.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET_KEY,
        });
    }

    validate(payload: Payload) {
        return {
            userId: payload.id,
            username: payload.username,
            roles: payload.roles
        };
    }
}
