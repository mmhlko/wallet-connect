"use client"

import { NftCard } from "@/entities/nft-card/ui/NftCard";
import { nftList } from "@/shared/constants/nft";

export const NftCollectionList = () => {
    console.log(nftList);
    
    return (
        <div className="max-w-[1116px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-[30px] place-items-center 2xl:place-items-start">
            {nftList.map((nft, index) => (
                <NftCard
                    key={nft.address + index}
                    contractAddress={nft.address}
                    chainId={nft.chainId}
                    type="collection"
                    number={index + 1}
                />
            ))}
        </div>
    )
}