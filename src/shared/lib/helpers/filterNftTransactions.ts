import { TAddress } from "@/shared/types";
import { NftTransaction } from "@/shared/types/nft";

export const filterNftTransactions = (transactions: NftTransaction[], walletAddress: TAddress) => {
    const separator = "_#"
    const walletNfts: { [key: string]: boolean } = {};

    transactions.forEach((transaction) => {
        const { from, to, contractAddress, tokenID, tokenName } = transaction;
        const nftItemId = contractAddress + separator + tokenName + separator + tokenID
        if (to.toLowerCase() === walletAddress.toLowerCase()) {
            walletNfts[nftItemId] = true;
        }
        if (from.toLowerCase() === walletAddress.toLowerCase()) {
            delete walletNfts[nftItemId];
        }
    });

    const filteredNft =
        Object.keys(walletNfts)
            .map((nftItemId) => nftItemId.split(separator))
            .map(item => ({
                contractAddress: item[0] as TAddress,
                tokenName: item[1],
                tokenID: item[2]
            }))

    return filteredNft
}