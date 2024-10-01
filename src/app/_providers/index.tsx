import { ReactNode } from "react"
import { AppKitProvider } from "./AppKitProvider"
import { TonConnectProvider } from "./TonConnectProvider"
import { headers } from "next/headers"
import { cookieToInitialState } from "wagmi"

export const RootProvider = ({children}: { children: ReactNode }) => {
    //const initialState = cookieToInitialState(wagmiAdapter, headers().get('cookie'))
    return (
        <AppKitProvider>
            <TonConnectProvider>
                {children}
            </TonConnectProvider>
        </AppKitProvider>
    )
}