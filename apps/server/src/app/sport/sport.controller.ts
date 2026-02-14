import { Controller, HttpCode, Post } from '@nestjs/common';

import { JsonServerService } from '../json-server.service';

@Controller('soccer')
export class SportController {
  constructor(private jss: JsonServerService) {}

  @Post('reset')
  @HttpCode(200)
  reset(): string {
    this.jss.reset();
    return 'Successful';
  }

  @Post('remove-e2e')
  @HttpCode(200)
  async removeE2e(): Promise<void> {
    const allGames = this.jss.data[`games`];
    const allPlayers = this.jss.data[`players`];
    const allCards = this.jss.data[`cards`];
    const allShots = this.jss.data[`shotsOnGoal`];

    const e2ePlayers = allPlayers
      .filter((player: any) => player.name.includes('e2e-'))
      .map((player: any) => player.id);

    const orphanCards = allCards
      .filter((card: any) => e2ePlayers.includes(card.player))
      .map((card: any) => card.id);

    const orphanShots = allShots
      .filter((shot: any) => e2ePlayers.includes(shot.player))
      .map((shot: any) => shot.id);

    this.jss.data[`cards`] = allCards.filter(
      (c: any) => !orphanCards.includes(c.id)
    );

    this.jss.data[`shotsOnGoal`] = allShots.filter(
      (s: any) => !orphanShots.includes(s.id)
    );

    this.jss.data[`players`] = allPlayers.filter(
      (p: any) => !e2ePlayers.includes(p.id)
    );

    this.jss.data[`games`] = allGames.filter(
      (game: any) => !game.name.includes('e2e-')
    );
  }
}
