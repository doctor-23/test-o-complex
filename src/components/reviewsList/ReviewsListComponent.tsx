import {FC} from "react";
import {useParseHTML} from "@/hooks/useParseHTML";
import sanitizeHtml from 'sanitize-html';
import styles from './reviewsList.module.scss';
import {Review, ReviewsList} from "@/api/Reviews";

interface ReviewsListComponentProps {
    list: ReviewsList;
}

const ReviewsListComponent: FC<ReviewsListComponentProps> = ({list}) => {
    return (
        <div className={styles.list}>

            {list.map((item: Review, index: number) => {
                const parseHTML = useParseHTML(item.text);
                const sanitizeHTML = sanitizeHtml(parseHTML)
                return (
                    <div
                        className={styles.item}
                        key={index}
                        dangerouslySetInnerHTML={{__html: sanitizeHTML}}
                    />
                )
            })}

        </div>
    )
}

export default ReviewsListComponent;
