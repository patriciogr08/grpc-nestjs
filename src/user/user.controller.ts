import { Controller, Get, Post, Body, Patch, Param, Delete, ConsoleLogger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdatedUserDto } from './dto/update-user.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { getUserDto } from './dto/get-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @GrpcMethod('UserService', 'GetAllUsers')
  async findAll() {
    return  await this.userService.getAllUsers();;
  }

  @GrpcMethod('UserService', 'GetUser')
  findOne(@Body() getUserDto: getUserDto) {
    return this.userService.findOne(getUserDto.id);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto.user);
  }

  @GrpcMethod('UserService', 'DeleteUser')
  delete(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.remove(deleteUserDto.id);
  }

}
