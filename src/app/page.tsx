import { NftCardItemList } from "@/widgets/nft-card-item-list";
import { NftCollectionList } from "@/widgets/nft-collection-list";

export default function Home() {

  return (
    <>
      <div className="container flex flex-col gap-10">
        <NftCollectionList />
        <h3 className="text-center text-xl">My NFTs</h3>
        <NftCardItemList />
      </div>
    </>
  );
}
