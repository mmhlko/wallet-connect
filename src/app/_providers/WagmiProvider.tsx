"use client"
import { ReactNode } from 'react'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'
import { metadata, projectId, wagmiConfig } from '../_config/wagmiConfig'
import { base, bsc } from 'wagmi/chains';
// import metaMaskIcon from "shared/assets/icons/icons8-metamask-100.png"

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
	wagmiConfig: wagmiConfig,
	projectId,
	enableAnalytics: true, // Optional - defaults to your Cloud configuration
	enableOnramp: true, // Optional - false as default
	themeMode: 'dark',
	defaultChain: base,
	themeVariables: {
		'--w3m-accent': '#4879e4',
		'--w3m-color-mix': '#f97316',
		'--w3m-border-radius-master': '32px',
	},
	metadata: metadata,
})

export default function Web3ModalProvider({
	children,
	initialState
}: {
	children: ReactNode
	initialState?: State
}) {

	return (
		<WagmiProvider config={wagmiConfig} initialState={initialState}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</WagmiProvider>
	)
}