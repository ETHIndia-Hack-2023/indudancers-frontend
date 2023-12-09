'use client'

import { Addresses } from '@/lib/addresses'
import { GameContract } from '@/lib/contracts'
import { DanceFloorData } from '@/types/game-types'
import { useAccount, useContractRead, useNetwork, useWalletClient } from 'wagmi'

export default function useDacnerFloorRead(): DanceFloorData {
  const account = useAccount()
  const network = useNetwork()

  const data = useContractRead({
    ...GameContract,
    address: Addresses.GameContract[network.chain?.id!]!,
    functionName: 'getDanceFloor',
    args: [account.address!, BigInt(0)],
    watch: true,
  })

  const floorData: DanceFloorData = {
    dancers: [],
  }

  for (let i = 0; i < 3; i++) {
    floorData.dancers.push([])
    for (let j = 0; j < 3; j++) {
      const id = (i + 1) * (j + 1) - 1
      floorData.dancers[i].push(
        data.data?.[id] != null
          ? {
              lvl: Number(data.data[id][0]),
              coins_per_minute: Number(data.data[id][1]),
              price: 100,
            }
          : null
      )
    }
  }

  return floorData
}
