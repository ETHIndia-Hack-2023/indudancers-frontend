'use client'

import { Address } from 'viem'

type AppConfig = {
  contractAddress: Address
}

const appConfig: AppConfig = {
  contractAddress: '0x0',
}

export default function useAppConfig(): AppConfig {
  return appConfig
}
