'use client'
import Image from "next/image";
import {useCart} from "@/hooks/useCartContent";
import HeaderComponent from "@/components/header/HeaderComponent";
import ReviewsComponent from "@/components/reviews/ReviewsComponent";
import CartComponent from "@/components/cart/CartComponent";
import styles from "./page.module.scss";
import CatalogComponent from "@/components/catalog/CatalogComponent";

export default function Home() {
    const {cartContent, addToCart, updateQuantity, removeFromCart} = useCart()


    return (
        <main className={styles.main}>
            <HeaderComponent/>
            <ReviewsComponent/>
            <CartComponent cartContent={cartContent} onItemRemove={removeFromCart}/>
            <CatalogComponent onAddToCart={addToCart} onUpdateQuantity={updateQuantity} />

        </main>
    );
}
