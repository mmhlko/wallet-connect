import { ReactNode } from "react"
import { AppKitProvider } from "./AppKitProvider"
import { TonConnectProvider } from "./TonConnectProvider"

export const RootProvider = ({children}: { children: ReactNode }) => {
    return (
        <AppKitProvider>
            <TonConnectProvider>
                {children}
            </TonConnectProvider>
        </AppKitProvider>
    )
}