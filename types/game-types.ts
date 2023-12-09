export type DancerData = {
  lvl: number
  coins_per_minute: number
  price: number
}

export type DanceFloorData = {
  dancers: (DancerData | null)[][]
}
