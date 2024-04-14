import styles from "./header.module.scss";
import Link from "next/link";
import cn from "classnames";

const HeaderComponent = () => {
    return (
        <div className={styles.header}>

            <div className={cn(styles.container, 'container')}>

                <Link href="/" className={styles.logo}>

                    Тестовое задание

                </Link>

            </div>

        </div>
    )
};

export default HeaderComponent;
