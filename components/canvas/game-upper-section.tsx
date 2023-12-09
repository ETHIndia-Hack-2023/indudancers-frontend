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

type Props = {}

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

  return (
    <div className="flex justify-start gap-5">
      <Button onClick={buyFloor}>Buy dance floor</Button>
      <Button onClick={buyDancer}>Buy dancer</Button>
    </div>
  )
}
