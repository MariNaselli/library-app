import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        //private readonly userService: UserService,
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ){}

    async login (loginDto: LoginDto){
        const {email, password} = loginDto;

        const user = await
    this.userRepository.findOne({where: {email}});
        
    if(!user){
            throw new
    UnauthorizedException('Credenciales Inválidas');
        }
        
        const passwordMatch = await 
    bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw new
    UnauthorizedException('Credenciales inválidas')
        }

        const payload = {sub:user.id, email:user.email, rol:user.rol};
        const token = await
    this.jwtService.signAsync(payload);

    return {
        access_token: token};
    };

    async register(registerDto: RegisterDto) {
        const { email, password, nombre, apellido } = registerDto;
      
        const userExist = await this.userRepository.findOne({ where: { email } });
        if (userExist) {
          throw new BadRequestException('El usuario ya existe');
        }
      
        const hashedPassword = await bcrypt.hash(password, 10);
      
        const newUser = this.userRepository.create({
          email,
          password: hashedPassword,
          nombre,
          apellido,
          rol: 'user',
          isActive: true,
        });
      
        await this.userRepository.save(newUser);
      
        return { message: 'Usuario creado con éxito' };
      }
      
    }

    // async validateUser(email:string, password:string): Promise<User>{
    //     const user = await
    // this.userRepository.findOne({where: {email}});
    // if (!user || !(await bcrypt.compare(password, user.password))){
    //     throw new UnauthorizedException ('Credenciales Inválidas');
    // }
    // return user;
    // }

    // async login(user:User): Promise<{access_token:string}>{
    //     const payload = { sub: user.id, email: user.email, rol: user.rol};
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     }
    // }

