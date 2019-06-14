import PlayerCard from "./player-card";

export default class Player2Card extends PlayerCard {
  constructor(x: number, y: number, id: number) {
    super(x, y, id);
    this.tileColor = 'rgba(1,0,0,0.2)';
    this.isEnemy = true;
  }
}