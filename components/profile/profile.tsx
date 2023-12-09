'use client'

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
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

import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })
  const { disconnect } = useDisconnect()

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
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PersonIcon />
              <p className="ml-5">Profile</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GearIcon />
              <p className="ml-5">Settings</p>{' '}
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
