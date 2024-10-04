import { ButtonWithCheckNetwork } from "@/shared/ui/ButtonWithCheckNetwork";
import { Chain } from "@/shared/ui/Chain";
import { NftCardItemList } from "@/widgets/nft-card-item-list";
import { NftCollectionList } from "@/widgets/nft-collection-list";

export default function Home() {

  return (
    <>
      <div className="container flex flex-col gap-10">
        <Chain />
        {/* <NftCollectionList />
        <h3 className="text-center text-xl">My NFTs</h3>
        <NftCardItemList /> */}
      </div>
    </>
  );
}
