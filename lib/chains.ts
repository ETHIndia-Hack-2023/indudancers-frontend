import { defineChain } from 'viem'
import { scrollSepolia } from 'viem/chains'

export const stylusTestnet = defineChain({
    id: 23011913,
    name: 'Stylus testnet',
    network: 'stylusTestnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['https://stylus-testnet.arbitrum.io/rpc'],
        // webSocket: ['wss://stylus-testnet.arbitrum.io/feed'],
      },
      public: {
        http: ['https://stylus-testnet.arbitrum.io/rpc'],
        // webSocket: ['wss://stylus-testnet.arbitrum.io/feed'],
      },
    },
    blockExplorers: {
      default: { name: 'Explorer', url: 'https://stylus-testnet-explorer.arbitrum.io/' },
    },
    contracts: {},
  })

export const SuppurtedChains = [
    stylusTestnet,
    scrollSepolia
]
