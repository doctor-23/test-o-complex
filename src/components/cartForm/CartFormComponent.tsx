import {FC} from "react";
import cn from "classnames";
import {CartComponentProps} from "@/components/cart/CartComponent";
import styles from './cartForm.module.scss';
import {CartItem} from "@/hooks/useCartContent";
import CartProductComponent from "@/components/cartProduct/CartProductComponent";

const CartFormComponent:FC<CartComponentProps> = ({cartContent, onItemRemove}) => {
    return (

        <form className={styles.form}>

            <div className={cn(styles.row, styles.rowProducts)}>
                {cartContent?.map((item: CartItem) => (
                    <CartProductComponent
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        quantity={item.quantity}
                        price={item.price}
                        itemRemove={onItemRemove}
                    />
                ))}
            </div>

            <div className={cn(styles.row, styles.rowInputs)}>

                <label htmlFor="">
                    <input type="tel" className={styles.input} name="phone" placeholder="Телефон" />
                </label>

                <button type="submit" className={styles.submit}>
                    Заказать
                </button>

            </div>

        </form>

    );
}

export default CartFormComponent;
