import { useCallback, useEffect, useState } from "react"
import { Abi } from "viem";
import { useSimulateContract, UseSimulateContractParameters, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { TAddress } from "../types";
import { ENftWriteFunctionNames } from "../types/wagmi";

const env = process.env.NODE_ENV

type TAbiProp = Abi

type TUseCustomWriteContract = {
    abi?: TAbiProp,
    address?: TAddress,
    functionName?: ENftWriteFunctionNames | string,
    args?: any[],
    isInputArgs: boolean,
    onSuccess?: (message?: string) => void,
    onFailure?: (message?: string) => void,
} & UseSimulateContractParameters

const processingErrorMessage = (errorMessage: string, functionName: ENftWriteFunctionNames | string) => {
    const lowerCaseMessage = errorMessage.toLowerCase();
    switch (true) {
        case lowerCaseMessage.includes("rejected"):
            return `${functionName} has been canceled`
        default:
            return `${functionName} is failed`
    }
}

export const useCustomWriteContract = ({ abi, address, functionName, args, onFailure, onSuccess, value, isInputArgs, ...config }: TUseCustomWriteContract) => {
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [isSuccess, setIsSuccess] = useState<boolean>();
    const [isClicked, setIsClicked] = useState(false);
    const transactionParameters: UseSimulateContractParameters = {
        abi,
        address,
        functionName,
        args,
        value,
        ...config
    }
    const { data: simulateData, refetch: refetchSimulateContract, error: simulateError, fetchStatus } = useSimulateContract(
        (isInputArgs && !args?.[0])
            ? {} //when arg changes while enter the input
            : transactionParameters
    );

    const {
        data: writeContractHash,
        writeContract,
        error: writeContractError,
    } = useWriteContract();

    const handleClickAction = (async () => {
        setIsClicked(true);
        if (simulateData) {
            writeContract(simulateData.request);
            setIsPending(true);
        } else if (isInputArgs) {
            setIsPending(true);
            try {
                const config = await refetchSimulateContract();
                const req = config.data?.request
                req && writeContract(req)
            } catch (error) {
                console.log(error);
            }
        }
    })

    const {
        data: transactionData,
        status: transactionStatus,
        error: waitForTransactionReceiptError,
    } = useWaitForTransactionReceipt({
        hash: writeContractHash,
    });

    const handleSuccess = () => {
        onSuccess && onSuccess(`${functionName} is successful`);
    }

    const handleFailure = (errorMessage?: string) => {
        onFailure && errorMessage && functionName && onFailure(processingErrorMessage(errorMessage, functionName));
    }

    useEffect(() => {
        if (transactionStatus === "success") {
            setIsError(false);
            setErrorMessage(undefined);
            setIsSuccess(true);
            setIsPending(false);
            handleSuccess();
            setIsClicked(false);
        }
    }, [transactionStatus])

    useEffect(() => {
        if (isClicked && simulateError) {
            env === "development" && console.log(111, "simulateError", functionName, simulateError);
            setIsError(true);
            setErrorMessage(simulateError.message);
            setIsPending(false)
            handleFailure(simulateError.message)
            return
        }
        if (simulateData && writeContractError) {
            env === "development" && console.log(222, writeContractError);
            setIsError(true);
            setErrorMessage(writeContractError.message);
            setIsPending(false)
            handleFailure(writeContractError.message)
            return
        }
        if (waitForTransactionReceiptError) {
            env === "development" && console.log(333, waitForTransactionReceiptError);
            setIsError(true);
            setErrorMessage(waitForTransactionReceiptError.message);
            setIsPending(false)
            handleFailure(waitForTransactionReceiptError.message)
            return
        }
        setIsError(false);
        setErrorMessage(undefined);
        setIsClicked(false);
    }, [simulateError, writeContractError, waitForTransactionReceiptError])

    return {
        isPending,
        isError,
        errorMessage,
        isSuccess,
        handleClickAction,
        transactionData
    }
}