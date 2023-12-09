'use client'

import { Addresses } from '@/lib/addresses'
import { GameContract } from '@/lib/contracts'
import { DanceFloorData } from '@/types/game-types'
import { useAccount, useContractRead, useNetwork, useWalletClient } from 'wagmi'

export default function useDancerFloorRead(address: string | null = null): {
  isLoading: boolean
  floorData: DanceFloorData
} {
  const account = useAccount()
  const network = useNetwork()

  console.log('Is ADDR NULL???')
  console.log(address == null)

  const addr = address == null ? account.address! : address

  console.log('ADDRESS IS: ' + addr)

  const data = useContractRead({
    ...GameContract,
    address: Addresses.GameContract[network.chain?.id!]!,
    functionName: 'getDanceFloor',
    args: [addr, BigInt(0)],
    watch: true,
  })

  const floorData: DanceFloorData = {
    dancers: [],
  }

  let id = 0

  for (let i = 0; i < 3; i++) {
    floorData.dancers.push([])
    for (let j = 0; j < 3; j++) {
      floorData.dancers[i][j] =
        data.data?.[id] != null
          ? {
              lvl: Number(data.data[id][0]),
              coins_per_minute: Number(data.data[id][1]),
              price: 100,
            }
          : null
      id++
    }
  }

  return { isLoading: data.isLoading, floorData }
}
