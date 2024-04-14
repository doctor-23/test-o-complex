import {useQuery} from "react-query";
import ReviewsListComponent from "@/components/reviewsList/ReviewsListComponent";
import {fetchReviewsList} from "@/api/Reviews";

export const FetchReviewsListView = () => {
    const {isLoading, isError, isSuccess, data} = useQuery(
        'reviews',
        () => fetchReviewsList()
    );
    if (isError) {
        return <p> Ошибка загрузки данных, перезагрузите страницу! </p>;
    }

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (isSuccess) {
        return <ReviewsListComponent list={data}/>;
    }
}
