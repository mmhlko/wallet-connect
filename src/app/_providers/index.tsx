import { ReactNode } from "react"
import { AppKitProvider } from "./AppKitProvider"
import { TonConnectProvider } from "./TonConnectProvider"
import { CounterStoreProvider } from "./CounterStoreProvider"

export const RootProvider = ({children}: { children: ReactNode }) => {
    return (
        <AppKitProvider>
            <TonConnectProvider>
                <CounterStoreProvider>
                    {children}
                </CounterStoreProvider>
            </TonConnectProvider>
        </AppKitProvider>
    )
}