"use client"

import { ButtonHTMLAttributes, HtmlHTMLAttributes, ReactNode } from "react"
import { useAccount, useSwitchChain } from "wagmi"
import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime"
import { Button, ButtonProps } from "antd"
import { CustomButton } from "./CustomButton"
import { chainsInfo, TChainNames } from "../constants/chainsInfo"

type TButtonWithCheckNetworkProps = {
    action?: () => void,
    children: ReactNode,
    network?: TChainNames,
    loading: boolean,
} /* & ButtonHTMLAttributes<HTMLButtonElement> */ & ButtonProps

export const ButtonWithCheckNetwork = ({ children, action, network, loading, ...rest }: TButtonWithCheckNetworkProps) => {
    const { chainId } = useAccount();
    const { switchChainAsync, isSuccess: isChainSwitchSuccess, data: switchChainData } = useSwitchChain();
    const contractChainId = network && chainsInfo[network].id
    const isWrongNetwork = chainId !== contractChainId

    const handleClickButton = async () => {
        const returnedNetwork = contractChainId && await switchChainAsync?.({ chainId: contractChainId })
        returnedNetwork && returnedNetwork.id === contractChainId && action && action()
    }

    return (
        <CustomButton {...rest} onClick={handleClickButton} loading={loading} color="orange" styleType="card">
            {isWrongNetwork
                ? `Switch on ${network}`
                : children}
        </CustomButton>
    )
}