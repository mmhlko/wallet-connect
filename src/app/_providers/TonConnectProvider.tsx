"use client"
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ReactNode, useEffect, useState } from 'react';

export const TonConnectProvider = ({ children }: { children: ReactNode }) => {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        setReady(true);
    }, []);
    if (!ready) return
    return (
        <TonConnectUIProvider manifestUrl="https://unique-cactus-04f1d3.netlify.app/tonconnect-manifest.json">
            {children}
        </TonConnectUIProvider>
    )
}