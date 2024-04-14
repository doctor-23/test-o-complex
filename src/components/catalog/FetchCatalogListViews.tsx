import {FC} from "react";
import {useQuery} from "react-query";
import {fetchCatalogList} from "@/api/CatalogList";
import CatalogListComponent from "@/components/catalogList/CatalogListComponent";
import {CatalogComponentProps} from "@/components/catalog/CatalogComponent";

export const FetchCatalogListViews:FC<CatalogComponentProps> = ({onAddToCart, onUpdateQuantity}) => {
    const {isLoading, isError, isSuccess, data} = useQuery(
        'catalog',
        () => fetchCatalogList(7)
    );

    if (isError) {
        return <p> Ошибка загрузки данных, перезагрузите страницу! </p>;
    }

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (isSuccess) {
        return <CatalogListComponent list={data.products} addToCart={onAddToCart} updateCount={onUpdateQuantity}/>;
    }
}
