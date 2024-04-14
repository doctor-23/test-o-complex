import styles from './cartProduct.module.scss';
import {FC} from "react";
import {CartItem} from "@/hooks/useCartContent";
import {usePriceFormat} from "@/hooks/usePriceFormat";
import { MdDeleteForever } from "react-icons/md";

export interface ExtendedCartItem extends CartItem {
    itemRemove: (id: number) => void;
}

const CartProductComponent:FC<ExtendedCartItem> = (
    {
        id,
        title,
        quantity,
        price,
        itemRemove
    }) => {
    const formattedPrice = usePriceFormat(price * quantity);

    const deleteItem = () => {
        itemRemove(id);
    }

    return (
        <div className={styles.item}>
            <h4 className={styles.title}>
                {title}
            </h4>

            <div className={styles.quantity}>
                x{quantity}
            </div>

            <div className={styles.price}>
                {formattedPrice} ₽
            </div>

            <div className={styles.remove} onClick={deleteItem}>
                <MdDeleteForever />
            </div>
        </div>
    )
}

export default CartProductComponent;
