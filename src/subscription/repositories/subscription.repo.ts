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
import { Subscription } from '../entities/subscription.entity';
import { EntityCondition, NullableType } from '../../utils/types';

@Injectable()
export class SubscriptionRepoService {
  constructor(
    @InjectRepository(Subscription)
    private readonly SubscriptionsRepository: Repository<Subscription>,
  ) {}

  findSubscription(
    params: EntityCondition<Subscription>,
    relations: FindOptionsRelations<Subscription> = {},
  ): Promise<NullableType<Subscription>> {
    return this.SubscriptionsRepository.findOne({
      where: params,
      relations,
    });
  }

  findSubscriptionsRawQuery(
    options: FindManyOptions<Subscription>,
  ): Promise<Subscription[]> {
    return this.SubscriptionsRepository.find(options);
  }

  createSubscription(
    payload: DeepPartial<Subscription>,
  ): Promise<Subscription> {
    return this.SubscriptionsRepository.save(
      this.SubscriptionsRepository.create(payload),
    );
  }

  updateSubscription(
    id: number,
    payload: DeepPartial<Subscription>,
  ): Promise<UpdateResult> {
    return this.SubscriptionsRepository.update({ id }, payload);
  }

  updateSubscriptionByParams(
    params: EntityCondition<Subscription>,
    payload: DeepPartial<Subscription>,
  ): Promise<UpdateResult> {
    return this.SubscriptionsRepository.update(params, payload);
  }

  softDeleteSubscription(
    params: EntityCondition<Subscription>,
  ): Promise<UpdateResult> {
    return this.SubscriptionsRepository.softDelete(params);
  }

  fullDeleteSubscription(
    params: EntityCondition<Subscription>,
  ): Promise<DeleteResult> {
    return this.SubscriptionsRepository.delete(params);
  }

  createQueryRunner(): QueryRunner {
    return this.SubscriptionsRepository.manager.connection.createQueryRunner();
  }
}
