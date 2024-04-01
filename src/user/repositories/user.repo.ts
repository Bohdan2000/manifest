import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  Repository,
  UpdateResult,
  DeleteResult,
  FindOptionsRelations,
  FindManyOptions,
  QueryRunner,
} from 'typeorm';
import { User } from '../entities/user.entity';
import { EntityCondition, NullableType } from '../../utils/types';

@Injectable()
export class UserRepoService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findUser(
    params: EntityCondition<User>,
    relations: FindOptionsRelations<User> = {},
  ): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: params,
      relations,
    });
  }

  findUsersRawQuery(options: FindManyOptions<User>): Promise<User[]> {
    return this.usersRepository.find(options);
  }

  createUser(payload: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(payload));
  }

  updateUser(id: string, payload: DeepPartial<User>): Promise<UpdateResult> {
    return this.usersRepository.update({ id }, payload);
  }

  updateUserByParams(
    params: EntityCondition<User>,
    payload: DeepPartial<User>,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(params, payload);
  }

  softDeleteUser(params: EntityCondition<User>): Promise<UpdateResult> {
    return this.usersRepository.softDelete(params);
  }

  fullDeleteUser(params: EntityCondition<User>): Promise<DeleteResult> {
    return this.usersRepository.delete(params);
  }

  createQueryRunner(): QueryRunner {
    return this.usersRepository.manager.connection.createQueryRunner();
  }
}
