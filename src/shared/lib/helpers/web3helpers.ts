import { formatUnits } from "viem";

export const convertFromBigNumber = (value: bigint | string, decimals = 18, format: "string" | "number" = "number") => {
    if (typeof value === "bigint") {
        return format === "string" ? formatUnits(value, decimals) : Number(formatUnits(value, decimals))
    } else if (typeof value === "string" && value.length > 1 && value.slice(-1) === 'n') {
        return Math.floor(+formatUnits(BigInt(parseInt(value)), decimals))
    } else {
        return 0
    }
}

export const isDefinedBigint = (value: any) => typeof value === "bigint" && value >= BigInt(0)