import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NullableType } from '../utils/types';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Public } from '../utils/public-decorator';
import { IsDeleted } from './interfaces';
import { UserCreateDto, UserUpdateDto } from './dtos';

@ApiTags('User')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  async createUser(@Body() userData: UserCreateDto): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Get()
  @Public()
  async findAllUsers(): Promise<NullableType<User[]>> {
    return this.userService.findUsersRawQuery({});
  }

  @Get(':id')
  @Public()
  async findUserById(@Param('id') id: string): Promise<NullableType<User>> {
    return this.userService.findUser({ id });
  }

  @Put(':id')
  @Public()
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UserUpdateDto,
  ): Promise<User> {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  @Public()
  async deleteUser(@Param('id') id: string): Promise<IsDeleted> {
    return this.userService.deleteUser(id);
  }
}
