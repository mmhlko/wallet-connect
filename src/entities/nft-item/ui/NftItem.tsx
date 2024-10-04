"use client"
import { abi } from "@/shared/lib/abi"
import { FC, useEffect, useState } from "react"
import { useReadContracts } from "wagmi"
import { ENftReadFunctionNames, TNftReadContractsData } from "@/shared/types/wagmi"
import { TAddress } from "@/shared/types"
import { TNftCardItem, TNftMetadata } from "@/shared/types/nft"
import { classNames } from "@/shared/lib/helpers/classNames"
import CardItemSkeleton from "@/shared/ui/CardItemSkeleton"
import { Button } from "antd"

type TNftCardItemProps = {
    cost?: number
    contractAddress: TAddress,
    chainId?: number,
    type: "collection" | "token",
    nftItem?: TNftCardItem,
    number?: number,
}
const methodList = [
    ENftReadFunctionNames.uri,
    ENftReadFunctionNames.name,
]

export const NftCardItem: FC<TNftCardItemProps> = ({ chainId, contractAddress, type, nftItem, number }) => {
    const [name, setName] = useState("")
    const [tokenUri, setTokenUri] = useState<TNftMetadata>()
    const [loading, setLoading] = useState(true)


    const contracts = methodList.map(functionName => ({
        abi: abi.nftContract,
        address: contractAddress,
        functionName,
        chainId
    }))
    const { data: nftData, error, status } = useReadContracts({ contracts }) as TNftReadContractsData

    const getNftData = async () => {
        if (nftData) {

            setLoading(true)
            const res = await fetch(nftData[0].result as string, { headers: { "X-Master-Key": "66fb73d3ad19ca34f8b0b5fa" } })
            const tokenUri: TNftMetadata = await res.json().then(data => data.record || data)
            setTokenUri(tokenUri);
            setName(nftData[1].result as string)
            setLoading(false)
        }
    }

    const handleCardClick = () => {
        //window.Telegram.WebApp.showPopup({message: "Share", title: "Share title", buttons: [{type: "close"}, {type: "ok"}]})
    }

    useEffect(() => {
        nftData && getNftData()
    }, [nftData])

    if (loading) {
        return (
            <div className="w-full max-w-[200px] shrink-0">
                <CardItemSkeleton />
            </div>
        )
    }

    return (
        <>
            <div className={classNames(
                "flex flex-col rounded-[20px] lg:rounded-[16px] gap-[20px] overflow-hidden h-full",
                "bg-white p-2.5 pb-[30px] w-full max-w-[200px] shrink-0 mx-auto"
            )}>
                <div className="text-center select-none flex flex-col gap-4">
                    <img src={tokenUri?.image} alt="picture" className="rounded-[16px] select-none pointer-events-none w-full h-full object-cover border-4 shadow-md" />
                    <h2 className="text-xl font-bold text-black mb-2.5">{`${name} #${nftItem?.tokenID}`}</h2>
                    <a className="btn_telegram_share" href={`https://t.me/share/url?url=${"t.me/SmartFactoryTMA_Bot/app"}&text=Share NFT`}>Поделиться</a>
                </div>
            </div>

        </>
    )
}