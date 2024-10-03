'use client'
import { createAppKit } from '@reown/appkit/react'

import { Config, cookieToInitialState, CreateConnectorFn, WagmiProvider } from 'wagmi'
import { base, binanceSmartChain, mainnet, polygon } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { ReactNode } from 'react'
import { injectedConnector, metadata, metaMaskConnector, MetaMaxConnect, walletConnectNoQrCodeConnector } from '../../features/connect-wallet/lib/config/wc'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = 'c6281576f0219712a95548a00016466d'

// const connectors: CreateConnectorFn[] = []
// connectors.push(walletConnect({ projectId, metadata, showQrModal: false })) // showQrModal must be false
// connectors.push(injected({ shimDisconnect: true }))
// connectors.push(
//   coinbaseWallet({
//     appName: metadata.name,
//     appLogoUrl: metadata.icons[0]
//   })
// )

export const networks = [mainnet, binanceSmartChain, polygon, base]

// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId,
  syncConnectedChain: true,
  connectors: [
    MetaMaxConnect(),
    metaMaskConnector,
    injectedConnector,
    walletConnectNoQrCodeConnector
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

//const wagmiConfig2= createWagmiConfig()

export function AppKitProvider({ children, cookies }: { children:ReactNode, cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}