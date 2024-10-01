"use client"
import { abi } from "@/shared/lib/abi"
import { FC, useEffect, useState } from "react"
import { useAccount, useReadContracts, UseReadContractsReturnType } from "wagmi"
import { ENftReadFunctionNames, ENftWriteFunctionNames, TNftReadContractsData, TReadContractsResult } from "@/shared/types/wagmi"
import { WriteContractPanel } from "./WriteContractPanel"
import { TAddress } from "@/shared/types"
import { NftItem, NftTransaction, TNftMetadata } from "@/shared/types/nft"
import { erc20Abi } from "viem"
import { feeTokenAddress, feeTokenDecimals } from "@/shared/constants/nft"
import { setFeePrice } from "../helpers"
import { classNames } from "@/shared/lib/helpers/classNames"
import { ModalMobile } from "@/shared/ui/ModalMobile"
import { CustomButton } from "@/shared/ui/CustomButton"

type TNftCardProps = {
    cost?: number
    contractAddress: TAddress,
    chainId?: number,
    type: "collection" | "token",
    nftItem?: NftItem,
    number?: number,
}
const methodList = [
    ENftReadFunctionNames.uri,
    ENftReadFunctionNames.name,
    ENftReadFunctionNames.fee,
]

export const NftCard: FC<TNftCardProps> = ({ chainId, contractAddress, type, nftItem, number }) => {
    const [name, setName] = useState("")
    const [tokenUri, setTokenUri] = useState<TNftMetadata>()
    const [fee, setFee] = useState<bigint>()
    const [loading, setLoading] = useState(true)
    const isCollection = type === "collection"
    const [openModal, setOpenModal] = useState(false)
    const { isConnected } = useAccount()

    const contracts = methodList.map(functionName => ({
        abi: abi.nftContract,
        address: contractAddress,
        functionName,
        chainId
    }))
    const { data: nftData, error, status } = useReadContracts({ contracts }) as TNftReadContractsData
    console.log(555, nftData);

    const getNftData = async () => {
        if (nftData) {

            setLoading(true)
            const res = await fetch(nftData[0].result as string, { headers: { "X-Master-Key": "66fb73d3ad19ca34f8b0b5fa" } })
            const tokenUri: TNftMetadata = await res.json().then(data => data.record || data)
            console.log(222, tokenUri);
            setTokenUri(tokenUri);
            setName(nftData[1].result as string)
            setFee(nftData[2].result as bigint)
            setLoading(false)
        }
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        nftData && getNftData()
    }, [nftData])

    if (loading) {
        return (
            isCollection
                ? (
                    <div className="flex flex-col gap-[30px] rounded-[20px] lg:rounded-[16px] bg-dark-main overflow-hidden p-5 xl:p-[30px] w-full max-w-[352px] h-full">
                        loading
                    </div>
                )
                : (
                    <div className="min-w-[370px] shrink-0">
                        loading
                    </div>
                )
        )
    }
    console.log(111, tokenUri);

    return (
        <>
            <div className={classNames(
                "flex flex-col rounded-[20px] lg:rounded-[16px] gap-[20px] overflow-hidden h-full",
                isCollection
                    ? "bg-foreground p-5 xl:p-[30px] w-full"
                    : "bg-white p-2.5 pb-[30px] w-full max-w-[350px] shrink-0 mx-auto",
            )}>
                <div className="flex justify-center max-h-[160px] pb-[40px]">
                    <div className={classNames(
                        "bg-transparent rounded-[16px] relative",
                        isCollection ? "w-full lg:max-w-[300px] max-h-[280px] lg:max-h-[300px] aspect-square" : "w-full max-w-[330px] h-full max-h-[330px]",
                    )}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={tokenUri?.image_url} alt="picture" className="rounded-[16px] select-none pointer-events-none w-full h-full object-cover" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={tokenUri?.image} alt="picture" className="absolute -bottom-[40px] left-[20px] max-w-[80px] max-h-[80px] rounded-[16px] select-none pointer-events-none w-full h-full object-cover border-4 shadow-md" />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <h2 className="text-background text-2xl">{name}</h2>
                    {fee !== undefined && (
                        <p className="text-base text-background">
                            {fee && <span className="text-base xl:text-[40px]">{"$ "}</span>}
                            {setFeePrice(fee, feeTokenDecimals)}
                        </p>
                    )}
                </div>
                <div className="mt-[30px] max-w-[384px] flex-1">
                    <p className="text-[#999] text-center text-sm lg:text-start xl:text-base">{tokenUri?.description}</p>
                </div>
                <CustomButton color="orange" styleType="card" onClick={handleOpenModal}>Create NFT</CustomButton>

            </div>
            <ModalMobile title="modal" isOpen={openModal} onClose={handleCloseModal}>
                <div className="relative transition duration-150 ease-in-out delay-150">
                    {nftData && fee !== undefined && (
                        <div className="flex flex-col">
                            <WriteContractPanel
                                config={{
                                    abi: abi.nftContract,
                                    functionName: ENftWriteFunctionNames.mintBatch,
                                    address: contractAddress,
                                    query: {
                                        retry: 0,
                                        refetchOnWindowFocus: false,
                                    },
                                    chainId: chainId
                                }}
                                approveConfig={{
                                    abi: erc20Abi,
                                    functionName: ENftWriteFunctionNames.approve,
                                    address: feeTokenAddress,
                                    chainId: chainId
                                }}
                                formProps={{
                                    buttonTitle: "mint now",
                                }}
                            />
                        </div>
                    )}
                </div>
            </ModalMobile>
        </>
    )
}