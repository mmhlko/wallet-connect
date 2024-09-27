import { Config } from "wagmi"
import { ConnectMutateAsync } from "wagmi/query"
import { ASSET_CDN } from "../constants/endpoints"
import { WalletFilledIcon } from "../../assets/icons"
import { WalletConfigV2 } from "../../types/walletConnect"
import { createWagmiConfig, walletConnectNoQrCodeConnector } from "./wc"
import { bsc, mainnet, polygon } from "viem/chains"


export enum ConnectorNames {
  MetaMask = 'metaMask',
  Injected = 'injected',
  WalletConnect = 'walletConnect',
  WalletConnectV1 = 'walletConnectLegacy',
  // BSC = 'bsc',
  BinanceW3W = 'BinanceW3WSDK',
  Blocto = 'blocto',
  WalletLink = 'coinbaseWalletSDK',
  // Ledger = 'ledger',
  TrustWallet = 'trust',
  CyberWallet = 'cyberWallet',
}

const createQrCode =
  <config extends Config = Config, context = unknown>(chainId: number, connect: ConnectMutateAsync<config, context>) =>
  async () => {
    const wagmiConfig = createWagmiConfig()
    const injectedConnector = wagmiConfig.connectors.find((connector) => connector.id === ConnectorNames.Injected)
    if (!injectedConnector) {
      return ''
    }
    // HACK: utilizing event emitter from injected connector to notify wagmi of the connect events
    const connector = {
      ...walletConnectNoQrCodeConnector({
        chains: [bsc, polygon, mainnet],
        emitter: injectedConnector?.emitter,
      }),
      emitter: injectedConnector.emitter,
      uid: injectedConnector.uid,
    }
    const provider = await connector.getProvider()

    return new Promise<string>((resolve) => {
      provider.on('display_uri', (uri) => {
        resolve(uri)
      })
      connect({ connector, chainId })
    })
  }

const isMetamaskInstalled = () => {
  if (typeof window === 'undefined') {
    return false
  }

  if (window.ethereum?.isMetaMask) {
    return true
  }

  if (window.ethereum?.providers?.some((p: any) => p.isMetaMask)) {
    return true
  }

  return false
}

const walletsConfig = <config extends Config = Config, context = unknown>({
  chainId,
  connect,
}: {
  chainId: number
  connect: ConnectMutateAsync<config, context>
}): WalletConfigV2<ConnectorNames>[] => {
  const qrCode = createQrCode(chainId, connect)
  return [
    {
      id: 'metamask',
      title: 'Metamask',
      icon: `${ASSET_CDN}/web/wallets/metamask.png`,
      get installed() {
        return isMetamaskInstalled()
        // && metaMaskConnector.ready
      },
      connectorId: ConnectorNames.MetaMask,
      deepLink: 'https://metamask.app.link/dapp/pancakeswap.finance/',
      qrCode,
      downloadLink: 'https://metamask.app.link/dapp/pancakeswap.finance/',
    },
    // {
    //   id: 'coinbase',
    //   title: 'Coinbase Wallet',
    //   icon: `${ASSET_CDN}/web/wallets/coinbase.png`,
    //   connectorId: ConnectorNames.WalletLink,
    // },
    // {
    //   id: 'trust',
    //   title: 'Trust Wallet',
    //   icon: `${ASSET_CDN}/web/wallets/trust.png`,
    //   connectorId: ConnectorNames.TrustWallet,
    //   get installed() {
    //     return !!getTrustWalletProvider()
    //   },
    //   deepLink: 'https://link.trustwallet.com/open_url?coin_id=20000714&url=https://pancakeswap.finance/',
    //   downloadLink: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
    //   guide: {
    //     desktop: 'https://trustwallet.com/browser-extension',
    //     mobile: 'https://trustwallet.com/',
    //   },
    //   qrCode,
    // },
    {
      id: 'walletconnect',
      title: 'WalletConnect',
      icon: `${ASSET_CDN}/web/wallets/walletconnect.png`,
      connectorId: ConnectorNames.WalletConnect,
    },
  ]
}

export const createWallets = <config extends Config = Config, context = unknown>(
  chainId: number,
  connect: ConnectMutateAsync<config, context>,
) => {
  const hasInjected = typeof window !== 'undefined' && !window.ethereum
  const config = walletsConfig({ chainId, connect })
  return hasInjected && config.some((c) => c.installed && c.connectorId === ConnectorNames.Injected)
    ? config // add injected icon if none of injected type wallets installed
    : [
        ...config,
        {
          id: 'injected',
          title: 'Injected',
          icon: WalletFilledIcon,
          connectorId: ConnectorNames.Injected,
          installed: typeof window !== 'undefined' && Boolean(window.ethereum),
        },
      ]
}
