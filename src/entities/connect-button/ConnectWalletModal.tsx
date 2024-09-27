import { ConnectorNames } from "@/app/_config/wallet"
import { WalletConfigV2 } from "@/app/_types/walletConnect"
import { classNames } from "@/shared/lib/helpers/classNames"
import { FC, MouseEvent, MouseEventHandler } from "react"
import { WalletSelect } from "./WalletSelect"

type TConnectWalletModalProps = {
    isOpen: boolean,
    wallets: WalletConfigV2<ConnectorNames>[],
    login: (connectorID: ConnectorNames) => Promise<any>,
    onClose: () => void,
}

export const ConnectWalletModal: FC<TConnectWalletModalProps> = ({ isOpen, wallets, login, onClose }) => {

    const connectWallet = (wallet: WalletConfigV2<ConnectorNames>) => {
        //setSelected(wallet)
        //setError('')


        if (wallet.installed !== false) {
            console.log(wallet);
            login(wallet.connectorId)
            //     .then((v) => {
            //       if (v) {
            //         localStorage.setItem(walletLocalStorageKey, wallet.title)
            //         try {
            //           onWalletConnectCallBack?.(wallet.title)
            //         } catch (e) {
            //           console.error(wallet.title, e)
            //         }
            //       }
            //     })
            //     .catch((err) => {
            //       if (err instanceof WalletConnectorNotFoundError) {
            //         setError(t('no provider found'))
            //       } else if (err instanceof WalletSwitchChainError) {
            //         setError(err.message)
            //       } else {
            //         setError(t('Error connecting, please authorize wallet to access.'))
            //       }
            //     })
        }
    }

    const handleCloseModal = () => {
        onClose()
    }
    const handleClickModal: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    return (
        <div
            className={classNames(
                isOpen ? "opacity-100 visible" : "opacity-0 invisible",
                "z-10 bg-black/70 fixed inset-0",
                "transition-all duration-300 ease-in"
            )}
            onClick={handleCloseModal}
        >
            <div
                className={classNames(
                    isOpen ? "translate-y-0" : "translate-y-full",
                    "fixed bottom-0 left-0 right-0 z-10",
                    "h-[350px]",
                    "bg-[#212121]",
                    "rounded-t-3xl pt-4 px-5",
                    "transition-all duration-200 ease-in",
                )}
                onClick={handleClickModal}
            >
                <h2 className="text-center mb-2">Connect Wallet</h2>
                <p className="text-white/50 mb-4 text-sm">Start by connecting with one of the wallets below. Be sure to store your private keys or seed phrase securely. Never share them with anyone.</p>
                <WalletSelect
                    wallets={wallets}
                    onClick={(wallet) => {
                        connectWallet(wallet)
                        if (wallet.deepLink && wallet.installed === false) {
                            window.open(wallet.deepLink)
                        }
                    }}
                />
                <button onClick={handleCloseModal} className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">x</button>
            </div>
        </div>
    )
}