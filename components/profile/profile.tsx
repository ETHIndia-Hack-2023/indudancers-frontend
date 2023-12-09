'use client'

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
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

export default function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })
  const { disconnect } = useDisconnect()
  const { chain, chains: chains22 } = useNetwork()

  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const { switchNetwork: switchScrollNetwork } = useSwitchNetwork({
    chainId: 534351,
  })

  const { switchNetwork: switchStylusNetwork } = useSwitchNetwork({
    chainId: 69,
  })

  const { switchNetwork: switchArbitrumNetwork } = useSwitchNetwork({
    chainId: 69,
  })

  const { switchNetwork: swtichZetChain } = useSwitchNetwork({
    chainId: 69,
  })

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
                  <SelectItem
                    value="stylus"
                    onSelect={() => switchStylusNetwork?.()}
                  >
                    Arbitrum Stylus
                  </SelectItem>
                  <SelectItem
                    value="scroll"
                    onSelect={() => {
                      switchScrollNetwork?.()
                      console.log('switch scroll')
                    }}
                  >
                    Scroll zkEVM
                  </SelectItem>
                  <SelectItem
                    value="arbitrum"
                    onSelect={() => {
                      switchArbitrumNetwork?.()
                      console.log('switch arbitrum')
                    }}
                  >
                    Arbitrum Mainnet
                  </SelectItem>
                  <SelectItem
                    value="zetchain"
                    onSelect={() => swtichZetChain?.()}
                  >
                    Zetchain
                  </SelectItem>
                </SelectContent>
              </Select>

              <div>{error && error.message}</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col">
              <>
                {chain && <div>Connected to {chain.name}</div>}
                {chains && (
                  <div>
                    Available chains: {chains.map((chain) => chain.name)}
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
