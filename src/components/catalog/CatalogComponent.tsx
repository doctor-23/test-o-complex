import {QueryClientProvider} from 'react-query';
import {queryClient} from "@/api/QueryClient";
import {FC} from "react";
import cn from "classnames";
import {FetchCatalogListViews} from "@/components/catalog/FetchCatalogListViews";
import {CartItem} from "@/hooks/useCartContent";
import styles from './catalog.module.scss';

export interface CatalogComponentProps {
    onAddToCart: ({id, quantity, title, price}: CartItem) => void,
    onUpdateQuantity: (id: number, quantity: number, price: number) => void,
}

const CatalogComponent: FC<CatalogComponentProps> = ({onAddToCart, onUpdateQuantity}) => {

    return (
        <section className={styles.catalog}>

            <div className={cn(styles.container, 'container')}>

                <h2 className={styles.title}>
                    Каталог
                </h2>

                <div className={styles.list}>

                    <QueryClientProvider client={queryClient}>
                        <FetchCatalogListViews onAddToCart={onAddToCart} onUpdateQuantity={onUpdateQuantity}/>
                    </QueryClientProvider>

                </div>

            </div>

        </section>
    );
}

export default CatalogComponent;
