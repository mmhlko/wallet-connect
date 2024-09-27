"use client"
import { TonConnectButton } from "@tonconnect/ui-react";
import { AppKitProvider } from "./_providers/AppKitProvider";
import { TonConnectProvider } from "./_providers/TonConnectProvider";
import { ConnectWalletButton } from "@/entities/connect-button/ConnectWalletButton";

export default function Home() {
  const domainName = "t.me/SmartFactoryTMA_Bot/app"// || "8924-195-239-51-199.ngrok-free.app"
  const metamask = `dapp://${domainName}`
  const trustwallet = `https://link.trustwallet.com/open_url?coin_id=60&url=${domainName}`
  const wc = "wc:2f38d1477f989f32742a9cb8c8f652a1cc6ce45c801b37f0c9cd3c17032f2818@2?expiryTimestamp=1727268450&relay-protocol=irn&symKey=1cd57fe54d8735ff8784fe4e68c93f7cc78a0389f6cd524dfe959aaacf9ee3f9"
  const redirect = (link: string) => {
    try {
      window.open(link, "_blank")
      console.log(window.location);
    } catch (error) {
      alert(error)
    }
  }

  const openMetamaskApp = () => {
    const walletConnectLink = "2c3ba4d9231007f331d3c5247bd53770e9cb182c3ebf7c2d1c98acc270354077@2?expiryTimestamp=1727276707&relay-protocol=irn&symKey=4ac59c18a78679daefc378dcee6dcf80c0808df18448a67ce01c3f4c20213ab7";
    //const targetLink = `https://metamask.app.link/dapp/${domainName}`;
// the target links only support https
    const webApp = window.Telegram.WebApp
    //window.open(`metamask://wc?uri=${walletConnectLink}`, "_blank")
    //webApp.openLink(`metamask://wc?uri=${walletConnectLink}`, {try_instant_view: true})
    window.open("https://metamask.app.link/send/0x165b2FBa89335E90baa9Eb59b399b1a30771c53e@1/transfer?address=0x165b2FBa89335E90baa9Eb59b399b1a30771c53e&uint256=1e18")
  }
  return (
    <AppKitProvider>
      <TonConnectProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header>
          <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
        </header>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <TonConnectButton />
          <w3m-button />
          <button onClick={() => redirect(wc)}>WC</button>
          <button onClick={openMetamaskApp}>metamask</button>
          <button onClick={() => redirect(trustwallet)}>trustwallet</button>
        </main>
      </div>
      </TonConnectProvider>
    </AppKitProvider>
  );
}
