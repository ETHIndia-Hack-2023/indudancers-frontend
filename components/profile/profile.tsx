'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div className="flex flex-row items-center w-full gap-4 rounded-md">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
          {' '}
          {address}
        </p>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </div>
    )
  return (
    <Button className="rounded-xl" onClick={() => connect()}>
      Connect Wallet
    </Button>
  )
}
