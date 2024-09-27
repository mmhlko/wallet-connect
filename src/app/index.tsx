"use client"
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
          <div className="flex justify-center">
            <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer></footer>
      </>
    )
  }