"use client"

import { FC, ReactNode, useMemo, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { bsc } from "viem/chains";
import { ConnectWalletModal } from "../connect-wallet-modal/ConnectWalletModal";
import { createWallets } from "../../lib/config/wallet";
import useAuth from "../../lib/hooks/useAuth";

type TConnectWalletButtonProps = {
    children: ReactNode,

}

export const ConnectWalletButton:FC<TConnectWalletButtonProps> = ({ children }) => {
    const [openModal, setOpenModal] = useState(false)
    const {chainId} = useAccount()
    const { connectAsync } = useConnect()
    const { login } = useAuth()

    const wallets = useMemo(() => createWallets(chainId || bsc.id, connectAsync), [chainId, connectAsync])

    return (
        <>
            <button
                onClick={() => {setOpenModal(!openModal)}}
                className="relative z-20 px-3 py-2 bg-indigo-400 rounded-lg font-bold active:relative top-[1px] text-white"
            >
                {children}
            </button>
            <ConnectWalletModal
                isOpen={openModal}
                wallets={wallets}
                login={login}
                onClose={() => {setOpenModal(false)}}
            />
        </>
    )
}