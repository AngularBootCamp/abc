import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class ClicksController {
  numClicks = 0;

  @Get('count')
  currentClicks(): { count: number } {
    return { count: this.numClicks };
  }

  @Post('increment')
  newTotalClicks(): void {
    this.numClicks++;
  }
}
