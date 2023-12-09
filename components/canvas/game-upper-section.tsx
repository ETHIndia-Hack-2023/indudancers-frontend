'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useContractWrite, useNetwork, usePrepareContractWrite, useSwitchNetwork } from 'wagmi';
import { GameContract } from '@/lib/contracts';
import { parseAbi } from 'viem/abi';
import { writeContract } from 'wagmi/actions';
import { Addresses } from '@/lib/addresses';

type Props = {}

export const CONTACTS_STORE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'auditor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes32[]',
        name: 'socialNetwork',
        type: 'bytes32[]',
      },
      {
        indexed: false,
        internalType: 'bytes32[]',
        name: 'contact',
        type: 'bytes32[]',
      },
    ],
    name: 'ContactsSet',
    type: 'event',
  },
]

export default function GameUpperSection({}: Props) {
  const [loading, setLoading] = useState(false);
  const network = useNetwork();

  const buyFloor = async () => {
    setLoading(true);

    await writeContract({
      ...GameContract,
      address: Addresses.GameContract[network.chain?.id!]!,
      functionName: 'buyFloor'
    })

    setLoading(false);
  }

  const buyDancer = async () => {
    setLoading(true);

    await writeContract({
      ...GameContract,
      address: Addresses.GameContract[network.chain?.id!]!,
      functionName: 'buyDancer',
      args: [BigInt(1)]
    })

    setLoading(false);
  }

  return (
    <div className="flex justify-start gap-5">
      <Button onClick={buyFloor}>Buy dance floor</Button>
      <Button onClick={buyDancer}>Buy dancer</Button>
    </div>
  )
}
