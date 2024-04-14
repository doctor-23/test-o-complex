import Image from "next/image";
import {FC, useRef, useState, ChangeEvent} from "react";
import {CatalogItem, CatalogList} from "@/api/CatalogList";
import sanitizeHtml from "sanitize-html";
import cn from "classnames";
import {useParseHTML} from "@/hooks/useParseHTML";
import {usePriceFormat} from "@/hooks/usePriceFormat";
import styles from './catalogList.module.scss';
import {CartItem} from "@/hooks/useCartContent";


interface CatalogListProps {
    list: CatalogList,
    addToCart: ({id, quantity, title, price}: CartItem) => void,
    updateCount: (id: number, quantity: number, price: number) => void,
}

const CatalogListComponent: FC<CatalogListProps> = ({list, addToCart, updateCount}) => {

    return (
        <div className={styles.list}>

            {list.length > 0 &&
                <div className={cn(styles.item, styles.emptyCatalog)}>
                    В каталоге сейчас пусто, но мы работаем над этим!
                </div>
            }

            {list.length !== 0 && (
                list.map((item: CatalogItem) => {
                    // console.log(item.id)
                    const [quantity, updateQuantity] = useState(0);
                    const parseTitle = useParseHTML(item.title);
                    const sanitizeTitle = sanitizeHtml(parseTitle);
                    const parseDescription = useParseHTML(item.description);
                    const sanitizeDescription = sanitizeHtml(parseDescription);
                    const formattedPrice = usePriceFormat(item.price);

                    const addProduct = () => {
                        updateQuantity(1);

                        addToCart({
                            id: item.id,
                            quantity: 1,
                            title: item.title,
                            price: item.price
                        });
                    }

                    const decrementCartItemQuantity = () => {
                        const newQuantity = quantity - 1;
                        updateCount(item.id, newQuantity, item.price);
                        updateQuantity(newQuantity);
                    }

                    const incrementCartItemQuantity = () => {
                        const newQuantity = quantity + 1;
                        updateCount(item.id, newQuantity, item.price);
                        updateQuantity(newQuantity);
                    }

                    const changeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
                        const target = event.target;
                        const value = parseFloat(target.value);
                        updateCount(item.id, value, item.price);
                        updateQuantity(value);
                    }

                    return (
                        <div className={styles.item} key={item.id}>

                            <div className={styles.image}>
                                <Image
                                    src={item.image_url}
                                    width={281}
                                    height={366}
                                    className="hidden md:block"
                                    alt={sanitizeTitle}
                                />
                            </div>

                            <h3 className={styles.title}>
                                {sanitizeTitle}
                            </h3>

                            <p className={styles.description}>
                                {sanitizeDescription}
                            </p>

                            <div className={styles.price}>
                                {formattedPrice} ₽
                            </div>

                            <div className={styles.bottomWrap}>

                                {quantity === 0 &&
                                    <button className={styles.btn} onClick={addProduct}>
                                        В корзину
                                    </button>
                                }

                                {quantity !== 0 && (
                                    <div className={styles.wrapper}>

                                        <button className={cn(styles.btn, styles.countBtn, styles.minus)}
                                                onClick={decrementCartItemQuantity}>
                                            -
                                        </button>

                                        <input
                                            type="number"
                                            name="quntity"
                                            value={quantity}
                                            className={styles.inputNum}
                                            onChange={changeQuantity}
                                        />

                                        <button className={cn(styles.btn, styles.countBtn, styles.plus)}
                                                onClick={incrementCartItemQuantity}>
                                            +
                                        </button>

                                    </div>
                                )}

                            </div>


                        </div>
                    );
                })
            )}

        </div>
    )
}

export default CatalogListComponent;
