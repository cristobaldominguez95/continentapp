import { Player } from './player.interface';

export interface PersistentData {
  currentRoundIndex: number;
  players: Player[];
}
