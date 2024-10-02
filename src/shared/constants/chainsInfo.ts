import { base, bsc, bscTestnet, Chain, polygon, polygonAmoy } from "viem/chains";

type TChainsInfo = typeof chainsInfo;;
//todo решить вопрос как хранить данные (разбивать тестнет на отдельную или нет)
export const chainsInfo = {
    bsc,
    bscTestnet,
    polygon,
    polygonAmoy,
    base
}

export type TChainNames = keyof typeof chainsInfo;


export const scanInfo = {
    base: {
        url: "https://api.basescan.org/api",
        apiKey: "MVJJWENBWUZDZEV5DDJPVWKIY84S9Q78GA"
    }
}