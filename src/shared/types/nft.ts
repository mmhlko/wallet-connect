import { TAddress } from ".";

export type TNftMetadata = {
    name: string;
    description: string;
    image: string;
    image_url: string;
    [key: string]: any;
}

export interface NftTransaction {
    blockNumber: string;          // Номер блока, в котором была включена транзакция
    timeStamp: string;            // Время создания транзакции в формате UNIX timestamp
    hash: string;                 // Хэш транзакции
    nonce: string;                // Nonce транзакции (порядковый номер транзакции)
    blockHash: string;            // Хэш блока, в который была включена транзакция
    from: string;                 // Адрес отправителя
    contractAddress: TAddress;      // Адрес контракта токена (NFT)
    to: string;                   // Адрес получателя
    tokenID: string;              // Идентификатор токена NFT
    tokenName: string;            // Имя токена (NFT)
    tokenSymbol: string;          // Символ токена
    tokenDecimal: string;         // Десятичные знаки (для NFT всегда 0)
    transactionIndex: string;     // Индекс транзакции в блоке
    gas: string;                  // Лимит газа для транзакции
    gasPrice: string;             // Цена газа (в wei)
    gasUsed: string;              // Объем использованного газа
    cumulativeGasUsed: string;    // Суммарный объем газа, использованный до этой транзакции
    input: string;                // Входные данные транзакции (обычно "deprecated" для NFT)
    confirmations: string;        // Количество подтверждений транзакции
}

export interface TNftCardItem {
    contractAddress: TAddress;      // Адрес контракта токена (NFT)
    tokenID: string;              // Идентификатор токена NFT
    tokenName: string;            // Имя токена (NFT)
}

export type TBaseScanNftTransfers = {
    status: string,
    message: string,
    result: NftTransaction[]
}

export type TWalletNftParams = {
    module: string,
    action: string,
    address: TAddress,
    apikey: string
}

export type TNftRenderList = {
    address: TAddress;
    chainId: number;
}[]
