import type { WindowProvider } from 'wagmi/window'
export interface ExtendEthereum extends WindowProvider {
  isMetaMask?: true
}

declare global {
    interface Window {
      ethereum?: ExtendEthereum
    }
}
export {}