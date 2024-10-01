import { ReactNode } from "react"
import { AppKitProvider } from "./AppKitProvider"
import { TonConnectProvider } from "./TonConnectProvider"
import { headers } from "next/headers"
import { cookieToInitialState } from "wagmi"
import Web3ModalProvider from "./WagmiProvider"

export const RootProvider = ({children}: { children: ReactNode }) => {
    //const initialState = cookieToInitialState(wagmiAdapter, headers().get('cookie'))
    return (
        <Web3ModalProvider>
            <TonConnectProvider>
                {children}
            </TonConnectProvider>
        </Web3ModalProvider>
    )
}