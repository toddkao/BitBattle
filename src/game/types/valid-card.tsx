import BrickCard from '../cards/brick-card';
import GrassCard from '../cards/grass-card';
import PlayerCard from '../cards/player-card';

export type ValidCard = (
  BrickCard |
  GrassCard |
  PlayerCard
);