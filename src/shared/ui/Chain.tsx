"use client"

import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { ButtonWithCheckNetwork } from "./ButtonWithCheckNetwork"

export const Chain = () => {
    const {chain} = useAccount()
    const [ready, setReady] = useState(false)
    const handleMint = () => {
        window.Telegram.WebApp.showPopup({message: "Hellow", buttons: [{type: "ok"}]})
    }
    useEffect(() => {
        setReady(true)
    }, [])
    if (!ready) return
    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-center">{chain?.name}</h2>
            <h2 className="text-center">{chain?.id}</h2>
            <ButtonWithCheckNetwork
                //type="primary"
                network="base"
                loading={false}
                action={handleMint}
                disabled={false}
            >
                popup
            </ButtonWithCheckNetwork>
        </div>
    )
}