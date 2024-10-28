import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  private fakeUsers = [
    {
      userName: 'Ghaus',
      email: 'qfU6D@example.com',
    },
    {
      userName: 'Jack',
      email: 'jack@gmail.com',
    },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userData: CreateUserDto) {
    this.fakeUsers.push(userData);
    return;
  }

  fetchUserById(id: number) {
    return this.fakeUsers[id - 1];
  }
}
