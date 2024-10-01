import { ReactNode } from "react"
import { AppKitProvider } from "./AppKitProvider"

export const RootProvider = ({children}: { children: ReactNode }) => {
    return (
        <AppKitProvider>
            {children}
        </AppKitProvider>
    )
}