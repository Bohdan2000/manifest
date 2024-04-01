import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../utils/public-decorator';
import { SubscriptionWebhookEventDto } from './dtos';
import { SubscriptionService } from './subscription.service';

@ApiTags('Subscription')
@Controller({
  path: 'subscriptions',
  version: '1',
})
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('webhook/notify')
  @Public()
  async saveSubscription(
    @Body() SubscriptionEventData: SubscriptionWebhookEventDto,
  ): Promise<void> {
    await this.subscriptionService.saveSubscription(SubscriptionEventData);
  }
}
