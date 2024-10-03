import { ReactNode } from "react"
import { AppKitProvider } from "./AppKitProvider"
import { TonConnectProvider } from "./TonConnectProvider"
import { CounterStoreProvider } from "./CounterStoreProvider"
import { headers } from "next/headers"

export const RootProvider = ({children}: { children: ReactNode }) => {
    const cookies = headers().get('cookie')
    return (
        <AppKitProvider cookies={cookies}>
            <TonConnectProvider>
                <CounterStoreProvider>
                    {children}
                </CounterStoreProvider>
            </TonConnectProvider>
        </AppKitProvider>
    )
}