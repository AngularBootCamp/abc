import { Module } from '@nestjs/common';

import { VisitCountGateway } from './visit-count.gateway';

@Module({
  providers: [VisitCountGateway]
})
export class VisitCountModule {}
