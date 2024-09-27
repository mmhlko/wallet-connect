import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ReactNode } from 'react';

export const TonConnectProvider = ({ children }: { children:ReactNode }) => {
    return (
        <TonConnectUIProvider manifestUrl="https://eea3-195-239-51-199.ngrok-free.app/tonconnect-manifest.json">
            { children }
        </TonConnectUIProvider>
    );
}