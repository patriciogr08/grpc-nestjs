import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatedUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userInsert = new User();
    userInsert.name = createUserDto.name;
    userInsert.email = createUserDto.email;
    userInsert.password = createUserDto.password;
    const user = await this.usersRepository.save(userInsert)
    return { user }
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({ where: { deletedAt: null }});
    return  {users}
  }

  async findOne(id: number) {
    if( !id ) return { user: null };
    const userFound = await this.usersRepository.findOne({ where: { id,deletedAt: null }} );
    console.log(userFound)
    if (!userFound) throw new NotFoundException('Este usuario no existe');

    return { user: userFound };
  }

  async update(id: number, updateUserDto: UpdatedUserDto) {
    if( !id ) return { user: null };
    const userFound = await this.usersRepository.findOne({ where: { id,deletedAt: null }} );
    if (!userFound) throw new NotFoundException('Este usuario no existe');
    const updatedUser = Object.assign(userFound, updateUserDto);
    
    const user = await this.usersRepository.save(updatedUser);
    return  { user }
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id,deletedAt: null }} );
    if (!user) throw new NotFoundException('Este usuario no existe');
   
    await this.usersRepository.update(id,{ deletedAt: new Date()});

    return {message: 'Usuario eliminado'}
  }
}
