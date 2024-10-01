"use client"

import Link from "next/link"
import { ReactNode } from "react"
import { classNames } from "../lib/helpers/classNames"
export type TButtonColor = "orange" | "transparent" | "white" | "black"
export type TButtonStyleType = "base" | "header" | "hero" | "card"
type TCustomButtonProps = {
    children: ReactNode
    onClick?: () => void
    extraClass?: string,
    color?: TButtonColor,
    href?: string,
    styleType?: TButtonStyleType,
    disabled?: boolean,
    target?: string,
    loading?: boolean,
    htmlType?: "button" | "submit" | "reset"
}
const commonStyles = classNames(
    "py-5 px-[30px] xl:py-[30px] xl:px-[40px] rounded-full"
)
const buttonStyles = {
    base: `${commonStyles}`,
    header: "px-4 py-1 text-sm lg:h-[56px] rounded-[64px] lg:px-[30px] lg:py-4 lg:text-base font-base hover:bg-orange-base hover:border-orange-base",
    hero: "",
    card: `py-4 px-[30px] xl:pl-[40px] rounded-xl font-semibold`,
}

export const CustomButton = (
    {
        onClick,
        children,
        extraClass = "",
        href = "",
        styleType = "base",
        color = "orange",
        disabled = false,
        target = "_self",
        loading = false,
        htmlType
    }: TCustomButtonProps) => {

    const handleClick = () => {
        onClick && onClick()
    }

    const getButtonColor = (color: TButtonColor) => {
        switch (color) {
            case "orange":
                return "bg-orange-base text-white"
            case "black":
                return "bg-dark-main text-white"
            case "transparent":
                return "bg-transparent border"
            default:
                return "bg-white text-black border-2 border-black";
        }
    }

    const Button = () => (
        <button
            type={htmlType}
            onClick={handleClick}
            className={classNames(
                'flex justify-center items-center disabled:pointer-events-none disabled:bg-[#EDEDED] disabled:text-[#767676] disabled:border-none ease-in-out duration-300',
                "text-xl uppercase",
                getButtonColor(color),
                extraClass,
                buttonStyles[styleType],
            )}
            disabled={disabled}
        >
            {children}
        </button>
    )
    return (
        href
            ? <Link className="flex flex-col" href={href} target={target} rel="noreferrer">
                <Button />
            </Link>
            : <Button />
    )
}