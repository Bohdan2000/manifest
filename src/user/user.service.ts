import { Injectable, Logger } from '@nestjs/common';

import { DeepPartial, FindOptionsRelations, FindManyOptions } from 'typeorm';

import { NullableType, EntityCondition } from '../utils/types';
import { User } from './entities/user.entity';

import { UserRepoService } from './repositories/user.repo';
import { IsDeleted } from './interfaces';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepoService: UserRepoService) {}

  findUser(
    params: EntityCondition<User>,
    relations: FindOptionsRelations<User> = {},
  ): Promise<NullableType<User>> {
    return this.userRepoService.findUser(params, relations);
  }

  findUsersRawQuery(options: FindManyOptions<User>): Promise<User[]> {
    return this.userRepoService.findUsersRawQuery(options);
  }

  createUser(payload: DeepPartial<User>): Promise<User> {
    return this.userRepoService.createUser(payload);
  }

  async updateUser(id: string, payload: DeepPartial<User>): Promise<User> {
    await this.userRepoService.updateUser(id, payload);

    return this.userRepoService.findUser({ id });
  }

  async deleteUser(id: string): Promise<IsDeleted> {
    const deleteStatus: IsDeleted = {
      isDeleted: false,
    };
    await this.userRepoService.fullDeleteUser({ id });

    deleteStatus.isDeleted = true;

    return deleteStatus;
  }
}
