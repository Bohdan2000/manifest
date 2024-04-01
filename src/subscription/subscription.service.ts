import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { FindOptionsRelations, FindManyOptions } from 'typeorm';

import { NullableType, EntityCondition } from '../utils/types';
import { Subscription } from './entities/subscription.entity';

import { SubscriptionRepoService } from './repositories/subscription.repo';
import { SubscriptionWebhookEventDto } from './dtos';
import { UserService } from '../user/user.service';

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(
    private readonly subscriptionRepoService: SubscriptionRepoService,
    private readonly userService: UserService,
  ) {}

  findSubscription(
    params: EntityCondition<Subscription>,
    relations: FindOptionsRelations<Subscription> = {},
  ): Promise<NullableType<Subscription>> {
    return this.subscriptionRepoService.findSubscription(params, relations);
  }

  findSubscriptionsRawQuery(
    options: FindManyOptions<Subscription>,
  ): Promise<Subscription[]> {
    return this.subscriptionRepoService.findSubscriptionsRawQuery(options);
  }

  async saveSubscription(payload: SubscriptionWebhookEventDto): Promise<void> {
    const user = await this.userService.findUser({ id: payload.customerId });
    if (!user) {
      throw new BadRequestException({
        message: 'User not found',
      });
    }
    const subscription = await this.subscriptionRepoService.createSubscription({
      status: payload.status,
      payment_frequency: payload.paymentFrequency,
      plan: payload.plan,
    });
    subscription.user = user;
    await subscription.save();
  }
}
