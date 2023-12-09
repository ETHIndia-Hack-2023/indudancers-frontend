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

type Props = {}

type ToBuyType = {
  lvl: number
  coin_per_minute: number
  price: number
}

// Level - coins_per_minute - price
const DANCERS_TO_BUY: ToBuyType[] = [
  { lvl: 1, coin_per_minute: 2, price: 5 },
  { lvl: 2, coin_per_minute: 5, price: 15 },
  { lvl: 3, coin_per_minute: 10, price: 25 },
  { lvl: 4, coin_per_minute: 100, price: 200 },
  { lvl: 5, coin_per_minute: 5000, price: 10000 },
]

export default function GameUpperSection({}: Props) {
  const [loading, setLoading] = useState(false)
  const [chainId, setChainId] = useState(23011913)
  const { data: walletClient, isError, isLoading } = useWalletClient()
  const network = useNetwork()
  const account = useAccount()

  const danceFloor = useContractRead({
    ...GameContract,
    address: Addresses.GameContract[network.chain?.id!]!,
    functionName: 'getDanceFloor',
    args: [account.address!, BigInt(0)],
    watch: true,
  })

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
  }

  const buyDancer = async () => {
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
      args: [BigInt(1)],
    })

    setLoading(false)
  }

  const buyNewDancer = (info: ToBuyType) => {
    alert('new dancer')
  }

  return (
    <div className="flex justify-start gap-5">
      <Button onClick={buyFloor}>Buy dance floor</Button>
      <Button onClick={buyDancer}>Buy dancer</Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button onClick={() => {}}>Buy dance floor</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
  )
}

type BuyDancerProps = {
  onClick(info: ToBuyType): void
  toBuy: ToBuyType
}

function BuyDancerDropComponent({ onClick, toBuy }: BuyDancerProps) {
  return (
    <div>
      <div className="flex justify-between flex-col">
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
