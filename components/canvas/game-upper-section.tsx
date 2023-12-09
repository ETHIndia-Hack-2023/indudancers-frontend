'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useContractWrite, useNetwork, usePrepareContractWrite, useSwitchNetwork } from 'wagmi';
import { GameContract } from '@/lib/contracts';
import { parseAbi } from 'viem/abi';
import { writeContract } from 'wagmi/actions';
import { Addresses } from '@/lib/addresses';

type Props = {}

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
