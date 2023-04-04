/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'
import { Rating } from '@mui/material';
import AiOutlineLike from 'react-icons/ai'
export const Review = ({ review }) => {
    // const {  image } = review.review;
    return (
        <>
        <div className={styles.review}>
            <div className={styles.flex}>
                {/* <div className={styles.review__user}>
                    <h4>
                        {name.slice(0, 1)}***{name.slice(name.length - 1, name.length)}
                    </h4>
                    <img src={image} alt="" />
                </div> */}
                <div className={styles.review__review}>
                    <Rating
                        name="half-rating-read"
                        value={review.rating}
                        precision={0.5}
                        readOnly
                        style={{ color: "#facf19" }}
                    />
                    <p>{review.review}</p>
                    <p>
                        <span>Overall Fit:</span>
                        {review.fit}
                        &nbsp;&nbsp;
                        <span>Size:</span>
                        {review.size}
                        &nbsp;&nbsp;
                        <div className={styles.flex}>
                            <img
                                src={review.style.image}
                                alt=""
                                className={styles.review__img}
                            />
                        </div>
                    </p>
                </div>
            </div>
            <div className={styles.flex}>
                <div className={styles.review__images}>
                    {review.images.length > 0 &&
                        review.images.map((img) => (
                            <>
                                <img src={img?.url} alt="" />
                            </>
                        )

                        )}
                </div>
                <div className={styles.review__extra}>
                    <div className={styles.review__extra_likes}>
                        {review.likes && review.likes?.likes}
                        {/* <AiOutlineLike /> */}
                    </div>
                    <div className={styles.review__extra_date}>
                        {review?.updatedAt?.slice(0, 10)}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
