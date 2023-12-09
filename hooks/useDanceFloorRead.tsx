'use client'

import { Addresses } from '@/lib/addresses'
import { GameContract } from '@/lib/contracts'
import { DanceFloorData } from '@/types/game-types'
import { useAccount, useContractRead, useNetwork, useWalletClient } from 'wagmi'

export default function useDancerFloorRead(address: string | null = null): {
  isLoading: boolean
  floorData: DanceFloorData,
  claimable: bigint,
  tokens_per_minute: bigint,
  errorSignature: `0x${string}` | undefined
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
    functionName: 'getGameData',
    args: [addr as `0x${string}`],
    watch: true,
  })

  console.log('Raw game data', data);

  const errorSignature = (data.error?.cause as any)?.signature as `0x${string}` | undefined;

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

  const claimable = data.data?.[9][0] || BigInt(0);
  const tokens_per_minute = data.data?.[9][1] || BigInt(0);

  console.log('Claimable', claimable);
  console.log('TPM', tokens_per_minute);

  return { isLoading: data.isLoading, floorData, claimable, tokens_per_minute, errorSignature }
}
