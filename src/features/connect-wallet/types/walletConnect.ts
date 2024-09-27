import { SVGAttributes } from "react";

type LinkOfTextAndLink = string | { text: string; url: string }

type DeviceLink = {
    desktop?: LinkOfTextAndLink
    mobile?: LinkOfTextAndLink
}

type LinkOfDevice = string | DeviceLink

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement> {
    theme?: any;
    spin?: boolean;
  }

export type WalletConfigV2<T = unknown> = {
    id: string
    title: string
    icon: string | React.FC<React.PropsWithChildren<SvgProps>>
    connectorId: T
    deepLink?: string
    installed?: boolean
    guide?: LinkOfDevice
    downloadLink?: LinkOfDevice
    mobileOnly?: boolean
    qrCode?: () => Promise<string>
    isNotExtension?: boolean
}