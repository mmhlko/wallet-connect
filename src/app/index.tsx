import { FC, ReactNode } from "react";
import { ConnectWalletButton } from "@/features/connect-wallet";

export const App: FC<{
  children: ReactNode;
}> = ({
  children,
}) => {
    return (
      <>
        <header className="py-6">
          <div className="flex justify-end px-4">
            <div>
              <w3m-button
                label="Connect wallet"
                balance="show"
                loadingLabel="Connecting..." />
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer></footer>
      </>
    )
  }