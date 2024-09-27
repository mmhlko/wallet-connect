"use client"
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Script from 'next/script';
import { ReactNode } from 'react';

export const TonConnectProvider = ({ children }: { children:ReactNode }) => {
    return (
        <>
        <TonConnectUIProvider manifestUrl="https://unique-cactus-04f1d3.netlify.app/tonconnect-manifest.json">
            { children }
        </TonConnectUIProvider>
        </>
    );
}