"use client"

import { TAddress } from "@/shared/types";
import { TBaseScanNftTransfers, TWalletNftParams } from "@/shared/types/nft";
import axios, { AxiosError, AxiosResponse } from "axios";

const walletNftParams = ({ address, apikey }: { address: TAddress, apikey: string }): TWalletNftParams => (
    {
        module: "account",
        action: "tokennfttx",
        address,
        apikey
    }
)
export class NftService {

    async fetchNftTokenList(scanUrl: string, address: TAddress, apikey: string): Promise<TBaseScanNftTransfers> {
        try {
            const response: AxiosResponse<TBaseScanNftTransfers> = await axios.get(scanUrl, { params: walletNftParams({ address, apikey }) })
            return response.data
        } catch (error: unknown) {
            // Обработка ошибок
            // Используем типизацию ошибки для AxiosError
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    // Ошибка с ответом от сервера
                    console.error(`Error: ${axiosError.response.data}`);
                    throw new Error(`API Error: ${(axiosError.response.data as any).message || 'Unknown error'}`);
                } else if (axiosError.request) {
                    // Запрос был отправлен, но ответа не последовало
                    console.error('No response received from API.');
                    throw new Error('No response from API.');
                }
            } else {
                // Другая ошибка (например, ошибка настройки запроса)
                console.error(`Request setup error: ${(error as Error).message}`);
                throw new Error(`Request setup error: ${(error as Error).message}`);
            }

            // Если тип ошибки не распознан
            throw new Error('Unknown error occurred.');
        }
    }
}

export const nftApi = new NftService();