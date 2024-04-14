import z from 'zod';

// Определение схемы данных для отзыва
export const ReviewSchema = z.object({
    id: z.number(),
    text: z.string()
});

// Тип отзыва
export type Review = z.infer<typeof ReviewSchema>;

// Определение схемы данных для списка отзывов
export const ReviewsListSchema = z.array(ReviewSchema);

// Тип списка отзывов
export type ReviewsList = z.infer<typeof ReviewsListSchema>;

// Определение схемы данных для ответа от сервера
export const FetchReviewsResponseSchema = z.array(ReviewsListSchema);

// Тип ответа от сервера
export type FetchReviewsResponse = z.infer<typeof FetchReviewsResponseSchema>;

/**
 * Функция для загрузки списка отзывов с сервера
 * @returns Промис с ответом от сервера
 */
export async function fetchReviewsList(): Promise<FetchReviewsResponse> {
    try {
        const response = await fetch('http://o-complex.com:1337/reviews', {
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
