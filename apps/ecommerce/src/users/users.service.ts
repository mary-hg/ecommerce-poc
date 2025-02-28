import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      username: 'john',
      password: 'changeme',
      roles: ['user'],
    },
    {
      id: '2',
      username: 'maria',
      password: 'guess',
      roles: ['admin'],
    },
  ];

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
