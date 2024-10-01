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
