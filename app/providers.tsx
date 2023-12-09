'use client'

import React from 'react'

import {
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
  useWalletClient,
  
} from 'wagmi'
import { createPublicClient, http } from 'viem'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { ContentPairProvider, LightNodeProvider } from '@waku/react'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Protocols } from '@waku/sdk'
import { CONTENT_TOPIC } from '@/components/chat/config'
import Nossr from '@/components/utils/nossr'
import { SuppurtedChains } from '@/lib/chains'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  SuppurtedChains,
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [new MetaMaskConnector({ chains })],
})

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <div>
      <LightNodeProvider
        options={{ defaultBootstrap: true }}
        protocols={[Protocols.Store, Protocols.Filter, Protocols.LightPush]}
      >
        <ContentPairProvider contentTopic={CONTENT_TOPIC}>
          <WagmiConfig config={config}>
            <Nossr>{children}</Nossr>
          </WagmiConfig>
        </ContentPairProvider>
      </LightNodeProvider>
    </div>
  )
}
