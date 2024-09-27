"use client"

import { FC, ReactNode, useMemo, useState } from "react";
import { ConnectWalletModal } from "./ConnectWalletModal";
import { createWallets } from "@/app/_config/wallet";
import { useAccount, useConnect } from "wagmi";
import { bsc } from "viem/chains";
import { WalletConfigV2 } from "@/app/_types/walletConnect";
import useAuth from "@/app/_hooks/useAuth";

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
                className="relative z-20 px-3 py-2 bg-indigo-400 rounded-lg font-bold active:relative top-[1px]"
            >
                {children}
            </button>
            <ConnectWalletModal
                isOpen={openModal}
                wallets={wallets}
                login={login}
            />
        </>
    )
}