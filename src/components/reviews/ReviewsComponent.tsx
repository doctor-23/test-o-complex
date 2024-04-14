'use client'
import {QueryClientProvider} from 'react-query';
import {queryClient} from "@/api/QueryClient";
import {FetchReviewsListView} from "@/components/reviews/FetchReviewsListView";
import cn from "classnames";
import styles from './reviews.module.scss';

const ReviewsComponent = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <section className={styles.reviews}>

                <div className={cn(styles.container, 'container')}>

                    <FetchReviewsListView />

                </div>

            </section>
        </QueryClientProvider>

    );
}

export default ReviewsComponent;
