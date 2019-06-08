export default interface Board {
  tiles: string[];
  mapping: { [id: string]:string },
  maxMovesPerTurn?: number,
  allowedCards?: string[];
  bannedCards?: string[];
}