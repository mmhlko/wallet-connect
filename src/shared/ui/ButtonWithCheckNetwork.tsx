"use client"

import { ButtonHTMLAttributes, HtmlHTMLAttributes, ReactNode, useState } from "react"
import { useAccount, useSwitchChain } from "wagmi"
import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime"
import { Button, ButtonProps } from "antd"
import { CustomButton } from "./CustomButton"
import { chainsInfo, TChainNames } from "../constants/chainsInfo"
import { classNames } from "../lib/helpers/classNames"

type TButtonWithCheckNetworkProps = {
    action?: () => void,
    children: ReactNode,
    network?: TChainNames,
    loading: boolean,
} /* & ButtonHTMLAttributes<HTMLButtonElement> */ & ButtonProps

export const ButtonWithCheckNetwork = ({ children, action, network, loading, ...rest }: TButtonWithCheckNetworkProps) => {
    const [switchLoading, setSwitchLoading] = useState(false)
    const { chainId } = useAccount();
    const { switchChainAsync, isSuccess: isChainSwitchSuccess, data: switchChainData } = useSwitchChain();
    const contractChainId = network && chainsInfo[network].id
    const isWrongNetwork = chainId !== contractChainId

    const handleClickButton = async () => {
        //window.Telegram.WebApp.openLink(`https://metamask.app.link`)
        setSwitchLoading(true)
        const returnedNetwork = contractChainId && await switchChainAsync?.({ chainId: contractChainId })
        if (returnedNetwork && returnedNetwork.id === contractChainId) {
            setSwitchLoading(false)
            action && action()
        }
    }

    return (
        <Button {...rest} onClick={handleClickButton} loading={loading || switchLoading} className={classNames(
            loading || switchLoading ? "pointer-events-none" : ""
        )} /* color="orange" styleType="card" */>
            {isWrongNetwork
                ? `Switch${switchLoading ? "ing" : ""} on ${network}`
                : children}
        </Button>
    )
}