
import { classNames } from "@/shared/lib/helpers/classNames"
import { FC, MouseEventHandler, ReactNode } from "react"

type TModalMobileProps = {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode,
    title: string,
}

export const ModalMobile: FC<TModalMobileProps> = ({ isOpen, onClose, title, children }) => {

    const handleCloseModal = () => {
        onClose()
    }
    const handleClickModal: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
    }

    return (
        <div
            className={classNames(
                isOpen ? "opacity-100 visible" : "opacity-0 invisible",
                "z-10 bg-black/70 fixed inset-0",
                "transition-all duration-300 ease-in"
            )}
            onClick={handleCloseModal}
        >
            <div
                className={classNames(
                    isOpen ? "translate-y-0" : "translate-y-full",
                    "fixed bottom-0 left-0 right-0 z-10",
                    "bg-foreground",
                    "rounded-t-3xl pt-4 px-5",
                    "transition-all duration-200 ease-in",
                )}
                onClick={handleClickModal}
            >
                <h2 className="text-center mb-2">{title}</h2>
                {children}
                <button onClick={handleCloseModal} className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">x</button>
            </div>
        </div>
    )
}