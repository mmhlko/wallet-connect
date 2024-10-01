import { convertFromBigNumber } from "@/shared/lib/helpers/web3helpers";

export const setFeePrice = (fee: bigint, feeTokenDecimals: number) => (
    fee === BigInt(0) ? "free" : `${convertFromBigNumber(fee, feeTokenDecimals, "string")}`
)