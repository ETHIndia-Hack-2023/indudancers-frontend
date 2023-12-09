export type DancerData = {
  lvl: number
  coins_per_minute: number
  price: number
}

export type DanceFloorData = {
  dancers: (DancerData | null)[][]
}

export const hasOnCell = (
  x: number,
  y: number,
  dancers: (DancerData | null)[][]
): boolean => {
  console.log(dancers[x][y])

  return dancers[x][y] != null && dancers[x][y]?.lvl != 0
}
