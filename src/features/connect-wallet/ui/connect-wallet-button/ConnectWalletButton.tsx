"use client"
import { FC, MouseEventHandler, ReactNode, use, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { bsc } from "viem/chains";
import { ConnectWalletModal } from "../connect-wallet-modal/ConnectWalletModal";
import { createWallets } from "../../lib/config/wallet";
import useAuth from "../../lib/hooks/useAuth";
//import { useTonConnectUI } from "@tonconnect/ui-react";
import { shortenedAddress } from "@/shared/lib/helpers/shortenAddress";
import { classNames } from "@/shared/lib/helpers/classNames";

type TConnectWalletButtonProps = {
    children: ReactNode,

}

export const ConnectWalletButton: FC<TConnectWalletButtonProps> = ({ children }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openWallet, setOpenWallet] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string>()
    const { chainId, isConnected, address, isConnecting } = useAccount();
    //const [isAuthChecking, setIsAuthChecking] = useState(false);
    //const [tonConnectUI] = useTonConnectUI();
    const { connectAsync } = useConnect();
    const { login } = useAuth();
    const { disconnectAsync, isPending: isDisconnecting } = useDisconnect()

    const wallets = useMemo(() => createWallets(chainId || bsc.id, connectAsync), [chainId, connectAsync]);
    const handleClickConnectWallet = () => {
        setOpenModal(!openModal)
    }
    const handleOpenWallet = () => {
        setOpenWallet(true)
    }

    const handleCloseWallet = () => {
        setOpenWallet(false)
    }

    const handleClickModal: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    const onClose = () => {
        setOpenModal(false)
    }

    const handleClickDisconnect = async () => {
        if (isConnected) {
            await disconnectAsync()
        }
        // if (tonConnectUI?.connected) {
        //     await tonConnectUI.disconnect()
        // }
        setOpenWallet(false)
    }

    const authCheck = useCallback(
        () => {
            const interval = setInterval(() => {
                //console.log("authCheck", isConnected, tonConnectUI?.connected);
                const isWalletConnected = isConnected /* || tonConnectUI?.connected */
                const walletAddress = address /* || tonConnectUI?.wallet?.account?.address */
                setIsWalletConnected(isWalletConnected)
                setWalletAddress(walletAddress)
                if (isWalletConnected && walletAddress) {
                    onClose()
                }
                clearInterval(interval)
            }, 100);
            return () => {
                clearInterval(interval)
            }
        }, [address, isConnected/* , tonConnectUI?.connected, tonConnectUI?.wallet?.account?.address */]
    )

    useEffect(() => {
        authCheck()
    }, [authCheck])

    return (
        <div>
            <button
                onClick={isWalletConnected ? handleOpenWallet : handleClickConnectWallet}
                className="px-3 py-2 bg-indigo-400 rounded-lg font-bold active:relative top-[1px] text-white"
            >
                {isWalletConnected
                    ? shortenedAddress(walletAddress)
                    : children
                }
            </button>
            <ConnectWalletModal
                isOpen={openModal}
                wallets={wallets}
                login={login}
                onClose={onClose}
            />
            <div
                className={classNames(
                    openWallet ? "opacity-100 visible" : "opacity-0 invisible",
                    "z-10 bg-black/70 fixed inset-0",
                    "transition-all duration-300 ease-in-out"
                )}
                onClick={handleCloseWallet}
            >
                <div
                    className={classNames(
                        openWallet ? "translate-y-0" : "translate-y-full",
                        "fixed bottom-0 left-0 right-0 z-10",
                        "h-[350px]",
                        "bg-gray-800",
                        "rounded-t-3xl pt-4 px-5",
                        "transition-all duration-200 ease-in-out",
                    )}
                    onClick={handleClickModal}
                >
                    <div className="flex justify-between">
                        <h3>{shortenedAddress(walletAddress)}</h3>
                        <div className="flex gap-1 items-center">
                            <span className="sc-ePDLzJ crDyDm"><svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7.3335C7.63133 7.3335 7.33333 7.03483 7.33333 6.66683V2.00016C7.33333 1.63216 7.63133 1.3335 8 1.3335C8.36867 1.3335 8.66667 1.63216 8.66667 2.00016V6.66683C8.66667 7.03483 8.36867 7.3335 8 7.3335ZM14 8.66683C14 6.5375 12.8506 4.5462 11.002 3.47087C10.6833 3.28553 10.2753 3.39343 10.0907 3.71143C9.90532 4.03009 10.0134 4.43822 10.3314 4.62288C11.772 5.46088 12.6667 7.01083 12.6667 8.66683C12.6667 11.2402 10.5727 13.3335 8 13.3335C5.42733 13.3335 3.33333 11.2402 3.33333 8.66683C3.33333 7.01083 4.22795 5.46088 5.66862 4.62288C5.98729 4.43822 6.09534 4.02943 5.90934 3.71143C5.72334 3.39343 5.31538 3.2842 4.99805 3.47087C3.14938 4.54687 2 6.5375 2 8.66683C2 11.9748 4.69133 14.6668 8 14.6668C11.3087 14.6668 14 11.9748 14 8.66683Z" fill="currentColor"></path></svg></span>
                            <span onClick={handleClickDisconnect}>{isDisconnecting ? "Disconnect..." : "Disconnect"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}