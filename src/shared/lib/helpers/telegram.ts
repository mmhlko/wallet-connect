"use client"
export const isTelegramWebAppFn = (): boolean => {
    if (typeof window === 'undefined') {
        return false
    }
    if (window.Telegram !== undefined
        && window.Telegram.WebApp !== undefined
        && window.Telegram.WebApp?.platform !== "unknown"
    ) {
        return true
    }
    return false
};
export const getTelegramPlatform = () => {
    if (typeof window === 'undefined') {
        return "none"
    }
    if (
        window.Telegram !== undefined
        && window.Telegram.WebApp !== undefined
        && window.Telegram.WebApp?.platform !== "unknown"
    ) {
        return window.Telegram.WebApp?.platform
    }
    return "none"
}
// if (isTelegramWebAppCheck()) {
//     console.log("Сайт открыт через Telegram Web App");
//     // Инициализация Telegram Web App
//     window.Telegram?.WebApp.init();

//     // Получаем initData (данные о пользователе и приложении)

//     // Пример работы с информацией о пользователе
//     if (window.Telegram!.WebApp.initDataUnsafe.user) {
//         const user = window.Telegram?.WebApp.initDataUnsafe.user;
//         console.log(`Пользователь: ${user?.first_name} ${user?.last_name || ''} (${user?.username || 'нет имени пользователя'})`);
//     }
// }  else {
//     console.log("Сайт не открыт через Telegram Web App");
// }
