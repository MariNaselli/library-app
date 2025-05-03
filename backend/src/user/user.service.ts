import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetadataWithSuchNameAlreadyExistsError, Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {

    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

  private toUserResponseDto(user: User): UserResponseDto {
  const { id, nombre, apellido, email, rol, isActive, createdAt } = user;
  return { id, nombre, apellido, email, rol, isActive, createdAt };
}

  
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const emailExists = await
    this.userRepository.findOne({
      where: {email:createUserDto.email},
    });
    if (emailExists){
      throw new ConflictException('El email ya está registrado');
    }
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    return this.toUserResponseDto(savedUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({
      where:{isActive:true},
    });

    return users.map((user) => this.toUserResponseDto(user));
    //removemos campos sensibles como password
    // return users.map(({password, ...rest}) =>rest);
  }

  //where: la base de datos devuelve solo los usuarios activos
  //map.. eliminamos el campo password de cada usuario para que nunca se exponga al front.

  //Promise partial: porque ahora el objeto usuario ya no tiene todos los campos, le quitamos el password

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id, isActive: true },
    });
  
    if (!user) {
      throw new NotFoundException(`No se encontró un usuario con id ${id}`);
    }
  
    return this.toUserResponseDto(user);
  }
  

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({where: {id}});
  
  if(!user){
    throw new NotFoundException('Usuario no encontrado');
  }

  if(updateUserDto.email && updateUserDto !== user.email){
    const emailExists = await this.userRepository.findOne({
      where: { email: updateUserDto.email},
    });

  if (emailExists){
    throw new ConflictException('El email ya está registrado')
  }
}
  const updateUser = this.userRepository.merge(user, updateUserDto);
  const savedUser = await this.userRepository.save(updateUser);

  return this.toUserResponseDto(savedUser);
  }

  async remove(id: number): Promise<UserResponseDto>  {
    const user = await this.userRepository.findOne({
      where: {id}
    });

    if(!user){
      throw new NotFoundException('Usuario no encontrado');
    }

    user.isActive = false;
    const savedUser = await this.userRepository.save(user);
    return this.toUserResponseDto(savedUser);
  }
}
