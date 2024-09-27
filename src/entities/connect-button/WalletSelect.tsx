import { ConnectorNames } from "@/app/_config/wallet"
import { WalletConfigV2 } from "@/app/_types/walletConnect"
import { classNames } from "@/shared/lib/helpers/classNames"
import { FC, useState } from "react"
type TWalletSelectProps = {
    wallets: WalletConfigV2<ConnectorNames>[],
    onClick: (wallet: WalletConfigV2<ConnectorNames>) => void,
    displayCount?: number,
}
export const WalletSelect: FC<TWalletSelectProps> = ({
    wallets,
    onClick,
    displayCount = 9,
}) => {
    const [showMore, setShowMore] = useState(false)
    const walletDisplayCount = wallets.length > displayCount ? displayCount - 1 : displayCount
    const walletsToShow = showMore ? wallets : wallets.slice(0, walletDisplayCount)

    return (
        <div className="grid grid-cols-4">
            {walletsToShow.map((wallet) => {
                const isImage = typeof wallet.icon === 'string'
                const Icon = wallet.icon
                return (
                    <button
                        key={wallet.id}
                        className={classNames(
                            "flex flex-col gap-2  justify-center items-center",
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
    )
}