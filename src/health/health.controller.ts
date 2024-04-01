import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
  HealthCheck,
  HealthCheckResult,
} from '@nestjs/terminus';
import { Public } from '../utils/public-decorator';

@Controller({
  path: 'health',
  version: '1',
})
export class HealthController {
  private readonly heapThreshold = 1024 * 1024 * 1024; // 1Gb

  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly database: TypeOrmHealthIndicator,
  ) {}

  @Get('status')
  @Public()
  @HealthCheck()
  checkMemory(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', this.heapThreshold),
      () => this.database.pingCheck('database'),
    ]);
  }
}
