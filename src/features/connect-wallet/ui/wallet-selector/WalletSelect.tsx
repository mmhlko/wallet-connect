import { classNames } from "@/shared/lib/helpers/classNames"
import { useAppKit } from "@reown/appkit/react"
import { useTonConnectUI } from "@tonconnect/ui-react"
import { FC, useState } from "react"
import { ConnectorNames } from "../../lib/config/wallet"
import { WalletConfigV2 } from "../../types/walletConnect"
type TWalletSelectProps = {
    wallets: WalletConfigV2<ConnectorNames>[],
    onClick: (wallet: WalletConfigV2<ConnectorNames>) => void,
    displayCount?: number,
}
export const WalletSelector: FC<TWalletSelectProps> = ({
    wallets,
    onClick,
    displayCount = 9,
}) => {
    const [showMore, setShowMore] = useState(false)
    const walletDisplayCount = wallets.length > displayCount ? displayCount - 1 : displayCount
    const walletsToShow = showMore ? wallets : wallets.slice(0, walletDisplayCount)
    const [tonConnectUI, setOptions] = useTonConnectUI();
    const { open } = useAppKit();
    return (
        <div className="flex flex-col gap-4">
            <button className="w-full bg-blue-500 h-[50px] rounded-2xl relative active:top-[1px]" onClick={() => { tonConnectUI.openModal() }}>TON Connect</button>
            <button className="w-full bg-blue-500 h-[50px] rounded-2xl relative active:top-[1px]" onClick={() => { open() }}>Wallet Connect</button>
            <div className="grid grid-cols-4 place-items-center">
            {walletsToShow.map((wallet) => {
                const isImage = typeof wallet.icon === 'string'
                const Icon = wallet.icon
                return (
                    <button
                        key={wallet.id}
                        className={classNames(
                            "flex flex-col gap-2  justify-center items-center max-w-max",
                            "relative active:top-[1px]",
                        )}
                        onClick={() => onClick(wallet)}
                    >
                        <div className={classNames(
                            "w-[50px] h-[50px] rounded-xl overflow-hidden",
                            "flex items-center justify-center",
                            "bg-slate-700"
                        )}>
                            {
                                isImage
                                    ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={Icon as string} alt={"icon"} width={50} height={50} />
                                    )
                                    : (
                                        <Icon width={24} height={24} fill="white" />
                                    )
                            }
                        </div>
                        <span className="text-xs leading-4 text-center font-light">{wallet.title}</span>
                    </button>
                )
            })}
        </div>
        </div>
    )

}