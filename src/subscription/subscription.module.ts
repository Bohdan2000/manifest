import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionRepoService } from './repositories/subscription.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), UserModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepoService],
  exports: [],
})
export class SubscriptionModule {}
