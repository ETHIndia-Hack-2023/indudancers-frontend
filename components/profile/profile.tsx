'use client'

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
  useWalletClient,
} from 'wagmi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  CalendarIcon,
  ChevronDownIcon,
  EnvelopeClosedIcon,
  ExitIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from '@radix-ui/react-icons'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { switchNetwork } from 'wagmi/actions'
import { useState } from 'react'
import { SuppurtedChains } from '@/lib/chains'

export default function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })
  const { disconnect } = useDisconnect()
  const { chain, chains } = useNetwork()
  const [error, setError] = useState('')
  const { data: walletClient, isError, isLoading } = useWalletClient()

  const changeNetwork = async (chainId: number) => {
    if (chain?.id != chainId) {
      try {
        await switchNetwork({
          chainId,
        })
      } catch {
        await walletClient?.addChain({
          chain: chains.find((chain) => chain.id == chainId)!,
        })
        await switchNetwork({
          chainId,
        })
      }
    }
  }

  if (isConnected)
    return (
      <div className="flex flex-row items-center w-full gap-4 rounded-md bg-accent-one_darker rounded-3xl p-1">
        <Avatar>
          <AvatarImage src="ensName" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
          {address}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDownIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuLabel>
              {chain && <div>Connected to {chain.name}</div>}
            </DropdownMenuLabel>
            <DropdownMenuItem className="flex flex-col">
              {/* <GearIcon />
              <p className="ml-5">Switch Network</p> */}

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Network" />
                </SelectTrigger>
                <SelectContent>
                  <>
                    {SuppurtedChains.map((chain) => (
                      <SelectItem
                        value={`${chain.id}`}
                        onSelect={() => {
                          changeNetwork(chain.id)
                        }}
                      >
                        {chain.name}
                      </SelectItem>
                    ))}
                  </>
                </SelectContent>
              </Select>

              <div>{error}</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col">
              <>
                {chain && <div>Connected to {chain.name}</div>}
                {chains && (
                  <div>
                    Available chains:{' '}
                    {SuppurtedChains.map((chain) => chain.name)}
                  </div>
                )}
              </>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PersonIcon />
              <p className="ml-5">Profile</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GearIcon />
              <p className="ml-5">Settings</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => disconnect()}>
              <ExitIcon /> <p className="ml-5">Logout</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )

  return (
    <Button className="rounded-xl" onClick={() => connect()}>
      Connect Wallet
    </Button>
  )
}
