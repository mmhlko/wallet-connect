"use client"
import { FC, useEffect, useState } from "react"
import { WriteForm } from "./WriteForm"
import { useCustomWriteContract } from "@/shared/hooks/useCustomWriteContract"
import { useAccount, useBalance, useReadContract, UseSimulateContractParameters } from "wagmi"
import { TReadContractData } from "@/shared/types/wagmi"
import { feeTokenAddress } from "@/shared/constants/nft"
import { parseEther, parseGwei } from "viem"
import { CustomButton } from "@/shared/ui/CustomButton"
import { MintForm } from "@/features/mint-nft"
import { TNftFormValues } from "@/features/mint-nft/types"
import { setNftUri } from "@/features/mint-nft/lib/helpers"
import { uriApi } from "@/app/_api/servises/uriApi"
import { Button, message } from "antd"
import { ButtonWithCheckNetwork } from "@/shared/ui/ButtonWithCheckNetwork"

type TWriteContractPanelProps = {
    config: UseSimulateContractParameters,
    approveConfig?: UseSimulateContractParameters,
    formProps?: {
        min?: string,
        max?: string,
        suffix?: string
        buttonTitle: string,
    },
    onActionSuccess?: () => {},
    onActionFailure?: () => {},
}

export const WriteContractPanel: FC<TWriteContractPanelProps> = ({ config, approveConfig, formProps, onActionSuccess, onActionFailure }) => {
    const [amountValue, setAmountValue] = useState<bigint>()
    const [isLoading, setIsLoading] = useState(false)
    const { address: walletAddress } = useAccount()
    const [modalText, setModalText] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isWarning, setIsWarning] = useState(false)
    const [isError, setIsError] = useState(false)
    const { isConnected } = useAccount()

    const [messageApi, contextHolder] = message.useMessage();

    const resetModalStates = () => {
        setIsSuccess(false)
        setIsError(false)
        setIsLoading(false)
        setIsWarning(false)
    }

    const setModalWarning = () => {
        resetModalStates()
        setIsWarning(true)
        setOpenModal(true)
        setModalText("insufficient USDC balance")
        setAmountValue(undefined)
        message.warning("insufficient USDC balance")
    }

    const SuccessMessage = () => {
        const closeMessage = () => {
            messageApi.destroy()
        }
        return (
            <div className="flex flex-col items-center gap-1">
                <span>Success</span>
                <Button type="primary" onClick={closeMessage}>Ok</Button>
            </div>
        )
    }
    const setModalProcessing = () => {
        resetModalStates()
        setIsLoading(true)
        setOpenModal(true)
        messageApi.open({
            type: 'loading',
            content: 'Open your wallet app to continue',
            duration: 10,
        });
    }

    const setModalError = () => {
        resetModalStates()
        setIsError(true)
        setOpenModal(true)
        message.error("error")
    }

    const setModalSuccess = () => {
        resetModalStates()
        setIsSuccess(true)
        setOpenModal(true)
        messageApi.open({
            type: 'success',
            content: <SuccessMessage />,
            duration: 20,
        });
    }

    const handleCloseModal = () => setOpenModal(false)

    const { data: feeTokenBalance } = useBalance({ address: walletAddress, token: feeTokenAddress });

    const { data: feeData, refetch: refetchFeeData } = useReadContract({
        address: config?.address,
        abi: config?.abi,
        functionName: "fee",
    }) as TReadContractData<bigint>

    const finalCost = (amountValue !== undefined) && (feeData !== undefined) && (amountValue * feeData) !== undefined ? amountValue * feeData : undefined;
    const { data: allowanceData, refetch: refetchAllowanceData } = useReadContract({
        address: approveConfig?.address,
        abi: approveConfig?.abi,
        functionName: "allowance",
        args: [walletAddress, config.address]
    }) as TReadContractData<bigint>

    const { handleClickAction: handleMintAction, isPending: isPendingMint } = useCustomWriteContract({
        ...config,
        args: [walletAddress, amountValue],
        isInputArgs: true,
        onSuccess: () => {
            setAmountValue(undefined)
            onActionSuccess && onActionSuccess()
            setIsLoading(false)
            setModalSuccess()
            refetchAllowanceData()
        },
        onFailure: () => {
            setAmountValue(undefined)
            setIsLoading(false)
            setModalError()
            onActionFailure && onActionFailure()
        },
        gas: BigInt(5000000),
    })

    const { handleClickAction: handleApproveAction } = useCustomWriteContract({
        ...approveConfig,
        args: finalCost !== undefined ? [config.address, finalCost] : [],
        isInputArgs: true,
        onSuccess: () => {
            refetchAllowanceData().then(() => {
                handleMintAction()
            })
        },
        onFailure: () => {
            setAmountValue(undefined)
            setIsLoading(false)
            resetModalStates()
            setOpenModal(false)
            onActionFailure && onActionFailure()
        },
    })

    const handleClickMint = async (values: TNftFormValues) => {
        const uri = await uriApi.uploadUri(setNftUri({ ...values, image: values.image[0] }))
        console.log(333, uri);

        //setAmountValue(BigInt(1))
    }

    const handleMint = async () => {
        setAmountValue(BigInt(1))
    }

    const setMessage = () => {

    }
    console.log({ amountValue });

    useEffect(() => {
        if (amountValue && feeTokenBalance !== undefined && finalCost !== undefined && finalCost > feeTokenBalance.value) {
            setModalWarning()
            return
        }
        if (amountValue && allowanceData !== undefined && finalCost !== undefined) {
            setModalProcessing()
            if (allowanceData >= finalCost) {
                handleMintAction()
            } else {
                handleApproveAction()
            }
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amountValue])
    //todo useEffect transactionData
    return (
        <>
            {/* <MintForm onSubmit={handleClickMint} disabled={false} /> */}
            <ButtonWithCheckNetwork
                //type="primary"
                network="base"
                loading={isLoading}
                action={handleMint}
                disabled={!isConnected}
            >
                {formProps?.buttonTitle}
            </ButtonWithCheckNetwork>
            {contextHolder}
        </>
    )
}

//<CustomButton color="orange" styleType="card" onClick={handleClickMint}>{formProps?.buttonTitle}</CustomButton>
