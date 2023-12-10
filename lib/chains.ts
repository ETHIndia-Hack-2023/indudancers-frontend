import { defineChain } from 'viem'
import { celoAlfajores, scrollSepolia, mantleTestnet } from 'viem/chains'

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

  export const x1net = defineChain({
    id: 195,
    name: 'X1',
    network: 'x1',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['https://testrpc.x1.tech'],
        webSocket: ['wss://x1testws.okx.com'],
      },
      public: {
        http: ['https://testrpc.x1.tech'],
        webSocket: ['wss://x1testws.okx.com'],
      },
    },
    blockExplorers: {
      default: { name: 'Explorer', url: 'https://www.oklink.com/x1-test' },
    },
    contracts: {
      multicall3: {
        address: '0xcA11bde05977b3631167028862bE2a173976CA11',
        blockCreated: 5882,
      },
    },
  })
  
export const SuppurtedChains = [
    stylusTestnet,
    scrollSepolia,
    celoAlfajores,
    mantleTestnet,
    x1net
]
