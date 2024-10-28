import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
    console.log('Sorting by', sortDesc);
    return { userName: 'Ghaus', email: 'qfU6D@example.com' };
  }

  @Get('posts')
  getUserPosts() {
    return [
      {
        userName: 'Ghaus',
        email: 'qfU6D@example.com',
        posts: [
          { id: 1, title: 'Post 1' },
          { id: 2, title: 'Post 2' },
          { id: 3, title: 'Post 3' },
        ],
      },
    ];
  }

  @Get('posts/comments')
  getUsersPostsComments() {
    return [
      {
        userName: 'Ghaus',
        email: 'qfU6D@example.com',
        comments: [
          { id: 1, comment: 'Comment 1' },
          { id: 2, comment: 'Comment 2' },
        ],
      },
    ];
  }

  @Post('createUser')
  createUser(@Req() req: Request, @Res() res: Response) {
    console.log('Logging...', req.body);
    res.send('User created');
  }

  @Post('createUserWithBodyDecorator')
  @UsePipes(new ValidationPipe())
  createUserBodyDecorator(@Body() userData: CreateUserDto) {
    console.log('Logging...', userData.email);
    return {};
  }

  //   @Get(':id/:postId')
  //   getUserById(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Param('postId') postId: string,
  //   ) {
  //     console.log('ID', id, postId);
  //     return { id, postId };
  //   }

  @Get('fakeUsers')
  getFakeUsers() {
    return this.usersService.fetchUsers();
  }

  @Post('createFakeUser')
  @UsePipes(new ValidationPipe())
  createFakeUser(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  @Get('fakeUser/:id')
  getFakeUserById(@Param('id', ParseIntPipe) id: number) {
    console.log('ID', id);
    return this.usersService.fetchUserById(id);
  }
}
