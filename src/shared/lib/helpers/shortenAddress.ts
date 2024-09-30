import { TAddress } from "@/shared/types";

export function shortenedAddress(address?: TAddress) {
    if (address) {
        // Проверяем длину адреса
        if (address.length <= 8) {
            return address; // Если адрес слишком короткий, возвращаем его без изменений
        }

        const start = address.slice(0, 4); // Первые 4 символа
        const end = address.slice(-4); // Последние 4 символа
        return `${start}...${end}`;
    }

}