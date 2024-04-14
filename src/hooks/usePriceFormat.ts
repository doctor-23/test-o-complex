export function usePriceFormat(price: string | number) {
    // Парсим строку цены в число, если это возможно
    const parsedPrice = typeof price === 'string' ? parseFloat(price) : price;

    // Если парсинг прошел успешно, форматируем цену
    if (!isNaN(parsedPrice)) {
        return parsedPrice.toLocaleString('en-US', { useGrouping: true }).replace(/,/g, ' ');
    } else {
        // Если парсинг не удался, возвращаем исходное значение
        return price;
    }
}
