import { base, polygon } from "viem/chains";
import { TAddress } from "../types";
import { TNftRenderList } from "../types/nft";

export const feeTokenAddress:TAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
export const feeTokenDecimals = 6;

export const nftList: TNftRenderList = [
    {
        address: "0x6Aa036a830BfeC4086b942f67bAfD7F82Cc5bD12", //Early Bird
        chainId: polygon.id,
    },
]