'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button } from '../ui/button'

export default function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div className="flex flex-col w-full gap-4 p-4 bg-blue-900 rounded-md">
        Connected to {address}
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </div>
    )
  return (
    <Button className="rounded-xl" onClick={() => connect()}>
      Connect Wallet
    </Button>
  )
}
