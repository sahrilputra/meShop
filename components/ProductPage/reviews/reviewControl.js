import { Rating } from '@mui/material'
import styles from './styles.module.scss'


export const ReviewControl = ({ product }) => {
    return (
        <div className={styles.reviews}>
            <div className={styles.review__container}>
                <h1>Review Pelanggan ({product.reviews.length}+)</h1>
                <div className={styles.reviews__stats}>
                    <div className={styles.reviews__stats_overview}>
                        <span>Average Ratings</span>
                        <div className={styles.reviews__stats_overview_rating}>
                            <Rating
                                name="half-rating-read"
                                defaultValue={product.rating}
                                precision={0.5}
                                readOnly
                                style={{ color: '#FACF19' }}
                            />
                            {product.rating == 0 ? "Belum ada review" : product.rating}
                        </div>
                    </div>

                    <div className={styles.reviews__stats_reviews}>
                        {
                            product.ratings.map((rating, i) => (
                                <>
                                    <div className={styles.reviews__stats_reviews_review}>
                                        <div className={styles.reviews__stats_overview_rating}>
                                            <Rating
                                                name="half-rating-read"
                                                defaultValue={5-i}
                                                readOnly
                                                style={{ color: '#FACF19' }}
                                            />
                                            <div className={styles.bar}>
                                                <div className={styles.bar__inner}
                                                style={{width:`${rating.percentage}%`}}></div>
                                            </div>
                                            <span>{rating.percentage}</span>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
