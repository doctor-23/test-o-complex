import styles from './cart.module.scss'
import cn from "classnames";
import {FC} from "react";
import CartFormComponent from "@/components/cartForm/CartFormComponent";

export interface CartComponentProps {
    cartContent: any[];
    onItemRemove: (id: number) => void;
}

const CartComponent: FC<CartComponentProps> = ({cartContent, onItemRemove}) => {
    return (
        <section className={styles.cart}>

            <div className={cn(styles.container, 'container')}>

                {cartContent?.length === 0 &&
                    <div className={cn(styles.cart, styles.emptyCart)}>
                        В корзине пусто!
                    </div>
                }

                {cartContent?.length !== 0 &&
                    <div className={styles.cart}>
                        <h3 className={styles.title}>
                            Добавленные товары
                        </h3>

                        <CartFormComponent cartContent={cartContent} onItemRemove={onItemRemove}/>
                    </div>

                }

            </div>

        </section>
    )
}

export default CartComponent;
