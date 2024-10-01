import { isChrome, isMetamaskMobile, isMobile, isMobileWebAndroid, isMobileWebSafari } from '@/shared/lib/helpers/platform'
import { http, createConfig, createStorage, cookieStorage } from 'wagmi'
import { base, bsc, bscTestnet, Chain, mainnet, polygon, polygonAmoy, sepolia } from 'wagmi/chains'
import { walletConnect, WalletConnectParameters } from 'wagmi/connectors'
import { injectedWithFallback, metamaskBrowserWalletConnect, trustBrowserWalletConnect } from './connectors'

// 1. Get projectId
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if (!projectId) throw new Error('Project ID is not defined')

// 2. Create wagmiConfig
export const metadata = {
    name: 'Smart Factory',
    description: 'Smart contract constructor',
    url: 'http://192.168.9.79/', // origin must match your domain & subdomain
    icons: ['/favicon.ico']
}

const walletConnectParams: WalletConnectParameters = {
    projectId,
    metadata,
    showQrModal: false,
}

export const getConnectors = () => {
    switch (true) {
        case isMobile && isMetamaskMobile:
            return undefined
        case isMobile && !isMetamaskMobile && (isMobileWebSafari || isChrome || isMobileWebAndroid):
            return [
                metamaskBrowserWalletConnect(walletConnectParams),
                trustBrowserWalletConnect(walletConnectParams),
                walletConnect(walletConnectParams),
            ]
        case !isMobile:
            return [
                walletConnect(walletConnectParams),
                injectedWithFallback(),
            ]
        default:
            return [
                injectedWithFallback()
            ]
    }
}
const chains: readonly [Chain, ...Chain[]] = [
    bscTestnet,
    bsc,
    polygon,
    polygonAmoy,
    sepolia,
    base,
]

interface TransportMap {
    [key: number]: ReturnType<typeof http>; // Тип для `http()`
}

const transports: TransportMap = {}

chains.forEach((element) => {
    transports[element.id] = http();
});

export const wagmiConfig = createConfig({
    chains,
    transports,
    connectors: getConnectors(),
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
})