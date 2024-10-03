"use client"

import { NftCard } from "@/entities/nft-card/ui/NftCard";
import { nftList } from "@/shared/constants/nft";

export const NftCollectionList = () => {
    console.log(nftList);
    
    return (
        <div className="flex justify-center">
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