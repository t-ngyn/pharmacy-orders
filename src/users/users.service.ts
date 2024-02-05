import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {
    this.seed();
  }

  async seed() {
    await this.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Doe Street',
      city: 'Doe City',
      state: 'Doe State',
      zipcode: '20200',
      country: 'Doe Country',
    });

    console.log('Seeded user');
  }

  create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.repository.create(createUserInput);
    return this.repository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repository.find({ relations: ['orders'] });
  }

  findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }
}
