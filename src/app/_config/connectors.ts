import { isMobile, isMobileWebAndroid, isMobileWebSafari } from "@/shared/lib/helpers/platform";
import { createConnector } from "wagmi";
import { injected, InjectedParameters, walletConnect, WalletConnectParameters } from "wagmi/connectors";

const domainName = process.env.NEXT_PUBLIC_DOMAIN_NAME

export function metamaskBrowserWalletConnect(data: WalletConnectParameters) {
    return createConnector((config) => {
        const wc = walletConnect(data)(config)
        config.emitter.on('message', ({ type, data }) => {
            if (type === 'display_uri' && isMobile) {
                window.location.href = (`dapp://${domainName}`)
            }
        })

        return {
            ...wc,
            id: 'metamaskBrowserWalletConnect',
            type: 'metamaskBrowserWalletConnect',
            name: 'MetaMask Browser',
            icon: '/metamask.ico',
        }
    })
}
export function trustBrowserWalletConnect(data: WalletConnectParameters) {
    return createConnector((config) => {
        const wc = walletConnect(data)(config)
        config.emitter.on('message', ({ type, data }) => {
            if (type === 'display_uri' && isMobileWebSafari) {
                if (isMobileWebSafari) {
                    window.location.href = ("https://link.trustwallet.com/open_url?coin_id=60&url=https%3A%2F%2F${domainName}")
                }
                if (isMobileWebAndroid) {
                    window.location.replace(`https://link.trustwallet.com/open_url?coin_id=60&url=https%3A%2F%2F${domainName}`)
                }
            }
        })

        return {
            ...wc,
            id: 'trustBrowserWalletConnect',
            type: 'trustBrowserWalletConnect',
            name: 'TrustWallet Browser',
            icon: '/trustWallet.webp',
        }
    })
}

export function injectedWithFallback(rest?: InjectedParameters) {
    return createConnector((config) => {
        const injectedConnector = injected({shimDisconnect: true, ...rest})(config)

        return {
            ...injectedConnector,
            connect(...params) {
                if (typeof window !== "undefined" && !window.ethereum) {
                    window.open('https://metamask.io/', 'inst_metamask')
                }
                return injectedConnector.connect(...params)
            },
            get icon() {
                if (typeof window !== "undefined") {
                    return !window?.ethereum || window?.ethereum?.isMetaMask ? '/metamask.ico' : '/browserWallet.webp'
                } else {
                    return '/browserWallet.webp'
                }
            },
            get name() {
                if (typeof window !== "undefined") {
                    return window?.ethereum?.isMetaMask ? 'MetaMask' : 'MetaMask Browser Wallet'
                } else {
                    return 'Default'
                }
            },
        }
    })
}