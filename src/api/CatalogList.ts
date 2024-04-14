import z from 'zod';

// Определение схемы данных для отзыва
export const CatalogItemSchema = z.object({
    id: z.number(),
    image_url: z.string(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
});

// Тип отзыва
export type CatalogItem = z.infer<typeof CatalogItemSchema>;

// Определение схемы данных для списка отзывов
export const CatalogListSchema = z.array(CatalogItemSchema);

// Тип списка отзывов
export type CatalogList = z.infer<typeof CatalogListSchema>;

// Определение схемы данных для ответа от сервера
export const FetchCatalogListResponseSchema = z.array(CatalogItemSchema); // Заменили CatalogListSchema на CatalogItemSchema

// Тип ответа от сервера
export type FetchCatalogListResponse = z.infer<typeof FetchCatalogListResponseSchema>;

/**
 * Функция для загрузки списка отзывов с сервера
 * @returns Промис с ответом от сервера
 */
export async function fetchCatalogList(perPage: number): Promise<FetchCatalogListResponse> {
    try {
        const response = await fetch(`http://o-complex.com:1337/products?page=1&page_size=${perPage}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
}
