"use client"

import { FC, ReactNode, useMemo, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { bsc } from "viem/chains";
import { ConnectWalletModal } from "../connect-wallet-modal/ConnectWalletModal";
import { createWallets } from "../../lib/config/wallet";
import useAuth from "../../lib/hooks/useAuth";
import { useTonConnectUI } from "@tonconnect/ui-react";

type TConnectWalletButtonProps = {
    children: ReactNode,

}

export const ConnectWalletButton:FC<TConnectWalletButtonProps> = ({ children }) => {
    const [openModal, setOpenModal] = useState(false)
    const { chainId, isConnected, address } = useAccount()
    const [ tonConnectUI ] = useTonConnectUI();
    const { connectAsync } = useConnect()
    const { login } = useAuth()
    const isWalletConnected = isConnected || tonConnectUI?.connected
    const walletAddress = address || tonConnectUI?.wallet?.account?.address

    const wallets = useMemo(() => createWallets(chainId || bsc.id, connectAsync), [chainId, connectAsync])
    const handleClickConnectWallet = () => {
        setOpenModal(!openModal)
    }

    return (
        <div>
            <button
                onClick={handleClickConnectWallet}
                className="relative z-20 px-3 py-2 bg-indigo-400 rounded-lg font-bold active:relative top-[1px] text-white"
            >
                {children}
            </button>
            {isWalletConnected && walletAddress && (
                <h2>{walletAddress.slice(-4)}</h2>
            )}
            <ConnectWalletModal
                isOpen={openModal}
                wallets={wallets}
                login={login}
                onClose={() => {setOpenModal(false)}}
            />
        </div>
    )
}