"use client"

import { getTelegramPlatform, isTelegramWebAppFn } from "./telegram"

export const isMobile: boolean | undefined =
    typeof navigator !== 'undefined' ? /iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent) : undefined

// Operating System
export const isWebAndroid: boolean =
    typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('android')
export const isWebIOS: boolean =
    typeof document !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    (['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone'].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document))
export const isWindows = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('windows')
export const isMacOS = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('macintosh')
export const isTelegramWebApp: boolean = isTelegramWebAppFn()
export const telegramPlatform: string = getTelegramPlatform()

// Capability
export const isTouchable =
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)

// Browser
const isSafariOrChrome: boolean = typeof navigator !== 'undefined' && /Safari/.test(navigator.userAgent || '')
export const isChrome: boolean = typeof navigator !== 'undefined' && /Chrome/.test(navigator.userAgent || '')
export const isSafari = !isChrome && isSafariOrChrome
export const isMetamaskMobile: boolean = typeof navigator !== 'undefined' && /MetaMaskMobile/.test(navigator.userAgent || '')
export const isMobileWebSafari: boolean = isTouchable && isSafari
export const isMobileWebAndroid: boolean = isTouchable && isWebAndroid

//export const isSafari = typeof navigator !== 'undefined' ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : undefined