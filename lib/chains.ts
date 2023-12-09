import { defineChain } from 'viem'

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
        webSocket: ['wss://stylus-testnet.arbitrum.io/rpc'],
      },
      public: {
        http: ['https://stylus-testnet.arbitrum.io/rpc'],
        webSocket: ['wss://stylus-testnet.arbitrum.io/rpc'],
      },
    },
    blockExplorers: {
      default: { name: 'Explorer', url: 'https://stylus-testnet-explorer.arbitrum.io/' },
    },
    contracts: {
      multicall3: {
        address: '0x42aaE78422EF3e8E6d0D88e58E25CA7C7Ecb9D5a',
        blockCreated: 5882,
      },
    },
  })
  