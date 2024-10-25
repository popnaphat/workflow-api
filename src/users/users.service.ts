import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    // return this.userRepository.save(createUserDto);
    // ตรวจสอบว่ามี username อยู่แล้วหรือไม่
    const existingUser = await this.userRepository.findOneBy({ username: createUserDto.username });
    if (existingUser) {
      // ถ้ามีแล้ว โยนข้อผิดพลาด (ConflictException) ออกไป
      throw new ConflictException('มี Username นี้อยู่แล้ว');
    }
    // gen salt    
    const salt = await bcrypt.genSalt();

    // enc password
    const encPassword = await bcrypt.hash(createUserDto.password, salt)

    // replace password with encPassword
    const userWithEncPassword = {...createUserDto, password: encPassword };

    // saved
    const savedUser = await this.userRepository.save(userWithEncPassword);

    // spread password filed from savedUser
    const { password, ...userWithoutPassword } = savedUser;

    // return user without password filed
    return userWithoutPassword;

  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByUsername(username: string): Promise<User> {
    if (!username) {
      return null
    }
    return this.userRepository.findOneBy({ username })
  }

}
