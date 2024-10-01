'use client'
import { createAppKit } from '@reown/appkit/react'

import { CreateConnectorFn, WagmiProvider } from 'wagmi'
import { binanceSmartChain, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { ReactNode } from 'react'
import { createWagmiConfig, MetaMaxConnect } from '../../features/connect-wallet/lib/config/wc'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = 'c6281576f0219712a95548a00016466d'

// 2. Create a metadata object - optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// const connectors: CreateConnectorFn[] = []
// connectors.push(walletConnect({ projectId, metadata, showQrModal: false })) // showQrModal must be false
// connectors.push(injected({ shimDisconnect: true }))
// connectors.push(
//   coinbaseWallet({
//     appName: metadata.name,
//     appLogoUrl: metadata.icons[0]
//   })
// )

export const networks = [mainnet, binanceSmartChain]

// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId,
  connectors: [
    MetaMaxConnect()
  ]
})

// 4. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: [],
    allWallets: false,
    email: false,
  },
  enableEIP6963: true,
  enableCoinbase: true,
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96"
  ],
})

const wagmiConfig2= createWagmiConfig()

export function AppKitProvider({ children }: { children:ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig2}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}