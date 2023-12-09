'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWalletClient,
} from 'wagmi'
import { GameContract } from '@/lib/contracts'
import { parseAbi } from 'viem/abi'
import { switchNetwork, writeContract } from 'wagmi/actions'
import { Addresses } from '@/lib/addresses'
import { stylusTestnet } from '@/lib/chains'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import useDancerFloorRead from '@/hooks/useDanceFloorRead'
import { useToast } from '../ui/use-toast'
import { formatEther } from 'viem'

type Props = {}

type ToBuyType = {
  lvl: number
  coin_per_minute: number
  price: number
}

// Level - coins_per_minute - price
const DANCERS_TO_BUY: ToBuyType[] = [
  { lvl: 1, coin_per_minute: 1, price: 10 },
  { lvl: 2, coin_per_minute: 5, price: 600 },
  { lvl: 3, coin_per_minute: 7, price: 9000 },
  { lvl: 4, coin_per_minute: 20, price: 19000 },
  { lvl: 5, coin_per_minute: 30, price: 30000 },
]

export default function GameUpperSection({}: Props) {
  const [loading, setLoading] = useState(false)
  const [chainId, setChainId] = useState(23011913)
  const { data: walletClient, isError, isLoading } = useWalletClient()
  const network = useNetwork()
  const account = useAccount()
  const { toast } = useToast()

  //   const danceFloor = useContractRead({
  //     ...GameContract,
  //     address: Addresses.GameContract[network.chain?.id!]!,
  //     functionName: 'getDanceFloor',
  //     args: [account.address!, BigInt(0)],
  //     watch: true,
  //   })

  const danceFloor = useDancerFloorRead()

  console.log('Dance floor', danceFloor)

  const buyFloor = async () => {
    if (network.chain?.id != chainId) {
      try {
        await switchNetwork({
          chainId,
        })
      } catch {
        await walletClient?.addChain({
          chain: stylusTestnet,
        })
        await switchNetwork({
          chainId,
        })
      }
    }

    setLoading(true)

    await writeContract({
      ...GameContract,
      address: Addresses.GameContract[network.chain?.id!]!,
      functionName: 'buyFloor',
    })

    setLoading(false)
    toast({
      title: 'New fance floor was bought!',
      description: 'You bought new dance floor',
    })

  }

  const buyDancer = async (level: bigint) => {
    if (network.chain?.id != chainId) {
      try {
        await switchNetwork({
          chainId,
        })
      } catch {
        await walletClient?.addChain({
          chain: stylusTestnet,
        })
        await switchNetwork({
          chainId,
        })
      }
    }

    setLoading(true)

    await writeContract({
      ...GameContract,
      address: Addresses.GameContract[network.chain?.id!]!,
      functionName: 'buyDancer',
      args: [level],
    })

    setLoading(false)

    toast({
      title: 'The new dancer was bought!',
      description: 'You bought new dancer',
    })
  }

  const buyNewDancer = async (info: ToBuyType) => {
    
    buyDancer(BigInt(info.lvl));
  }

  const getCoinsPerMinute = () => {
    let sum = 0

    for (let i = 0; i < danceFloor.floorData.dancers.length; i++) {
      for (let j = 0; j < danceFloor.floorData.dancers[i].length; j++) {
        if (danceFloor.floorData.dancers[i][j] == null) {
          continue
        }
        sum += danceFloor.floorData.dancers[i][j]!.coins_per_minute
      }
    }
    danceFloor.floorData.dancers
    return sum
  }

  const someBalance = 1
  const coinsPerMinute = getCoinsPerMinute()

  return (
    <div className="flex justify-start gap-5 items-center">
      <div className="flex font-bold text-white outline-green-600 outline outline-4 p-2 rounded-2xl">
        <p>
          Balance: {formatEther(danceFloor.claimable)} (+ {formatEther(danceFloor.tokens_per_minute)} coins per second)
        </p>
      </div>
      <div className="flex justify-start gap-5">
        <Button variant={'destructive'} onClick={buyFloor}>
          Buy dance floor
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={'destructive'} onClick={() => {}}>
              Buy dancer
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-[40vh] overflow-y-scroll">
            <DropdownMenuLabel>Dancers marketplace</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {DANCERS_TO_BUY.map((data, key) => (
              <>
                <DropdownMenuItem>
                  <BuyDancerDropComponent
                    key={key}
                    onClick={buyNewDancer}
                    toBuy={data}
                  />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

type BuyDancerProps = {
  onClick(info: ToBuyType): void
  toBuy: ToBuyType
}

function BuyDancerDropComponent({ onClick, toBuy }: BuyDancerProps) {
  return (
    <div>
      <div className="flex justify-between flex-col w-full">
        <p className="flex justify-between">
          <p>Level: </p>
          <p>{toBuy.lvl}</p>
        </p>
        <p className="flex justify-between">
          <p>Coin per minute: </p>
          <p>{toBuy.coin_per_minute}</p>
        </p>
        <p className="flex justify-between">
          <p>Price: </p>
          <p>{toBuy.price}</p>
        </p>
      </div>
      <div>
        <Button
          className="w-full"
          size={'sm'}
          variant={'destructive'}
          onClick={() => onClick(toBuy)}
        >
          Buy
        </Button>
      </div>
    </div>
  )
}
