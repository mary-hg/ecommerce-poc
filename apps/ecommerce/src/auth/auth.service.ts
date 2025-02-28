import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user';
import { AuthPayload } from './auth_payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(username: string, pass: string): User | null {
    const user = this.usersService.findOne(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  login(user: User) {
    const payload: AuthPayload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
