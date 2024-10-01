import { UseReadContractReturnType, UseReadContractsReturnType } from "wagmi";

export enum ENftWriteFunctionNames {
    approve = "approve",
    mintBatch = "mintBatch",
    safeMint = "safeMint",
}
export enum ENftReadFunctionNames {
    uri = "uri",
    tokenURI = "tokenURI",
    name = "name",
    fee = "fee"
}

export type TReadContractsResult<T> = [
    {
        error?: Error | undefined;
        result: T;
        status: "success" | "failure";
    }
]

export type TReadContractData<T> = UseReadContractReturnType & {
    data?: T
}

export type TNftReadContractsData = UseReadContractsReturnType & {
    data?: TReadContractsResult<string | bigint | boolean>
}