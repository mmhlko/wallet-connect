import { base, bsc, mainnet, polygon } from "viem/chains"
import { createConfig, createConnector, http } from "wagmi"
import { injected, walletConnect, WalletConnectParameters } from "wagmi/connectors"
import { CLIENT_CONFIG } from "./viem"

export const projectId = "c6281576f0219712a95548a00016466d"
const domainName = process.env.NEXT_PUBLIC_DOMAIN_NAME


// 2. Create a metadata object - optional
export const metadata = {
    name: 'AppKit',
    description: 'AppKit Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932']
  }

export const isMobile: boolean | undefined =
    typeof navigator !== 'undefined' ? /iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent) : undefined

// export const WC_PARAMS = {
//     projectId,
//     metadata: {
//         name: 'Uniswap',
//         description: 'Uniswap Interface',
//         url: 'https://app.uniswap.org',
//         icons: ['https://app.uniswap.org/favicon.png'],
//     },
//     qrModalOptions: {
//         themeVariables: {
//             '--wcm-font-family': '"Inter custom", sans-serif',
//         },
//     },
// }

export const WC_PARAMS_Max = {
    projectId,
    metadata: {
        name: 'Maxim',
        description: 'Maxim Interface',
        url: 'https://sm-factory.oisx.site',
        icons: ['https://sm-factory.oisx.site/favicon.ico'],
    },
    qrModalOptions: {
        themeVariables: {
            '--wcm-font-family': '"Inter custom", sans-serif',
        },
    },
}

// export function uniswapWalletConnect() {
//     return createConnector((config) => {
//         const wc = walletConnect({
//             ...WC_PARAMS,
//             showQrModal: false,
//         })(config)
//         config.emitter.on('message', ({ type, data }) => {
//             if (type === 'display_uri') {
//                 // Emits custom wallet connect code, parseable by the Uniswap Wallet
//                 const uniswapWalletUri = `https://uniswap.org/app/wc?uri=${data}`
//                 config.emitter.emit('message', { type: 'display_uniswap_uri', data: uniswapWalletUri })

//                 // Opens deeplink to Uniswap Wallet if on mobile
//                 if (true) {
//                     // Using window.location.href to open the deep link ensures smooth navigation and leverages OS handling for installed apps,
//                     // avoiding potential popup blockers or inconsistent behavior associated with window.open
//                     window.location.href = `uniswap://wc?uri=${encodeURIComponent(data as string)}`
//                 }
//             }
//         })

//         return {
//             ...wc,
//             id: 'uniswapWalletConnect',
//             type: 'uniswapWalletConnect',
//             name: 'Uniswap Wallet Max',
//             icon: 'https://app.uniswap.org/favicon.png',
//         }
//     })
// }

export function MetaMaxConnect() {
    return createConnector((config) => {
        const wc = walletConnect({
            ...WC_PARAMS_Max,
            showQrModal: false,
        })(config)

        config.emitter.on('message', ({ type, data }) => {


            if (type === 'display_uri') {
                //config.emitter.emit('message', { type, data })
                window.Telegram.WebApp.openLink(`https://metamask.app.link/wc?uri=${(data as string)}`)
                //window.Telegram.WebApp.openLink(`https://metamask.app.link/wc?uri=${encodeURIComponent(data as string)}`)

                //window.location.href = (`metamask://wc?uri=${data}`)
                //window.open(`metamask://wc?uri=${(data as string)}`, "_blank")
                //window.open('https://metamask.io/', 'inst_metamask')
                //window.location.replace(`https://metamask.io/wc?uri=${encodeURIComponent(data as string)}`)
                // // Emits custom wallet connect code, parseable by the Uniswap Wallet
                // //const uniswapWalletUri = `https://metamask.app.link/wc?uri=${data}`
                // config.emitter.emit('message', { type, data })
                // // Opens deeplink to Uniswap Wallet if on mobile
                // if (isMobile) {
                //     // Using window.location.href to open the deep link ensures smooth navigation and leverages OS handling for installed apps,
                //     // avoiding potential popup blockers or inconsistent behavior associated with window.open
                //     //window.location.href = `metamask://wc?uri=${encodeURIComponent(data as string)}`

                // }
            }
        })

        return {
            ...wc,
            id: 'metaMaxConnect',
            type: 'metaMaxConnect',
            name: 'Meta Max',
            icon: 'https://app.uniswap.org/favicon.png',
        }
    })
}

export const walletConnectConnector = walletConnect({
    showQrModal: true,
    projectId,
})
export const walletConnectNoQrCodeConnector = walletConnect({
    showQrModal: false,
    projectId,
    metadata: metadata
})
export const metaMaskConnector = injected({ target: 'metaMask', shimDisconnect: false })
export const trustConnector = injected({ target: 'trust', shimDisconnect: false })
export const injectedConnector = injected({ shimDisconnect: false })

export function metamaskBrowserWalletConnect(data: WalletConnectParameters) {
    return createConnector((config) => {
        const wc = walletConnect(data)(config)
        config.emitter.on('message', ({ type, data }) => {
            if (type === 'display_uri' && isMobile) {
                //window.Telegram.WebApp.openLink(`https://metamask.app.link/wc?uri=${encodeURIComponent(data as string)}`)
                window.Telegram.WebApp.openLink(`dapp://${domainName}`)
            }
        })

        return {
            ...wc,
            id: 'metamaskBrowserWalletConnect',
            type: 'metamaskBrowserWalletConnect',
            name: 'MetaMask Browser',
            icon: 'https://app.uniswap.org/static/media/metamask-icon.c8b2298e68e585a7f4d9c7b7e6320715.svg',
        }
    })
}

export function createWagmiConfig() {
    return createConfig({
      chains: [bsc, polygon, mainnet, base],
      ssr: true,
      syncConnectedChain: true,
      transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [bsc.id]: http(),
        [base.id]: http(),
      },
      ...CLIENT_CONFIG,
  
      connectors: [
        metaMaskConnector,
        injectedConnector,
        walletConnectConnector
      ],
    })
  }