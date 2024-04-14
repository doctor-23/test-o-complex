'use client'

import {useState} from "react";

export interface CartItem {
    id: number;
    quantity: number;
    title: string;
    price: number;
}

export const useCart = () => {
    const [cartContent, updateCartContent] = useState<CartItem[]>(() => {
        const cartList = typeof window !== 'undefined' ? localStorage.getItem('cartList') || '' : '';
        return cartList ? JSON.parse(cartList) : [];
    });

    const setSessionCartList = (list: CartItem[]) => {
        sessionStorage.setItem('cartList', JSON.stringify(list));
    }

    const addToCart = ({id, quantity, title, price}: CartItem) => {
        const product: CartItem = {
            id: id,
            quantity: quantity,
            title: title,
            price: price,
        };

        updateCartContent(prevList => {
            // Добавляем товар в корзину
            const updatedList = [...prevList, product];
            // Сохраняем обновленный список товаров в sessionStorage
            setSessionCartList(updatedList);
            return updatedList;
        });
    }

    const updateQuantity = ( id: number, quantity: number, price: number) => {

        if (quantity) {
            updateCartContent(prevList => {
                console.log(price)
                // Проверяем, есть ли товар с таким id уже в корзине
                const existingProductIndex = prevList.findIndex(item => item.id === id);
                if (existingProductIndex !== -1) {
                    // Если товар уже есть, обновляем его количество и цену
                    const updatedList = [...prevList];
                    const existingProduct = updatedList[existingProductIndex];
                    updatedList[existingProductIndex] = {
                        ...existingProduct,
                        quantity: quantity,
                        price: price * quantity
                    };
                    // Сохраняем обновленный список товаров в sessionStorage
                    setSessionCartList(updatedList);
                    return updatedList;
                }
                // Возвращаем предыдущий список, если товар не найден
                return prevList;
            });
        } else {
            removeFromCart(id);
        }

    }

    const removeFromCart = (id: number) => {
        updateCartContent(prevList => {
            // Фильтруем список товаров, оставляя только те, у которых id не совпадает с id удаляемого товара
            const updatedList = prevList.filter(item => item.id !== id);
            // Сохраняем обновленный список товаров в sessionStorage
            setSessionCartList(updatedList);
            return updatedList;
        });
    }

    return {cartContent, addToCart, updateQuantity, removeFromCart};
}
