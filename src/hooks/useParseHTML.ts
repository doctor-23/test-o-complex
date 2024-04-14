import DOMPurify from "dompurify"; // Импорт DOMPurify из библиотеки
import z from "zod"; // Импорт z из библиотеки

// Определение схемы данных с использованием zod
const DataSchema = z.object({
    tagName: z.string(), // Тег элемента
});

// Определение типа данных на основе схемы данных
type Data = z.infer<typeof DataSchema>;


// Объявление функции useDOMPurify, принимающей текст в качестве параметра и возвращающей очищенный текст
export const useParseHTML = (text: string) => {
    // Объявление внутренней функции sanitizeText, которая очищает текст с использованием DOMPurify
    const sanitizeText = (text: string) => {
        // Конфигурационный объект для DOMPurify
        const config = {
            ADD_TAGS: ["script"], // Добавление тега script в разрешенные
        };

        // Добавление хука uponSanitizeElement для обработки элементов DOM перед их очисткой
        DOMPurify.addHook("uponSanitizeElement", (node: Element, data: Data) => {
            // Проверка, что элемент имеет тег script
            if (data.tagName === "script") {
                // Замена символов < и > в содержимом тега script на соответствующие HTML-сущности
                let scriptOuterHtml = node.outerHTML;
                node.outerHTML = scriptOuterHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
        });

        // Очистка текста с использованием DOMPurify и возвращение результата
        return DOMPurify.sanitize(text, config);
    };

    // Вызов внутренней функции sanitizeText и возврат результата
    return sanitizeText(text);
};
