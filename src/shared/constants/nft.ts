import { base, polygon } from "viem/chains";
import { TAddress } from "../types";
import { TNftRenderList } from "../types/nft";

export const feeTokenAddress:TAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
export const feeTokenDecimals = 6;

export const nftList: TNftRenderList = [
    {
        address: "0x99CeB197e4855e8b68e08d9735D8325a815bD688", //Early Bird
        chainId: polygon.id,
    },
]