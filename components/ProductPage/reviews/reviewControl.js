import { Rating } from '@mui/material'
import styles from './styles.module.scss'
import {useSession, signIn } from 'next-auth/react'
import { AddReview } from './AddReview';

export const ReviewControl = ({ product }) => {
    const { data : session } = useSession();
    return (
        <div className={styles.reviews}>
            <div className={styles.review__container}>
                <h1>Review Pelanggan ({product.reviews.length}+)</h1>
                <div className={styles.reviews__stats}>
                    <div className={styles.reviews__stats_overview}>
                        <span>Ratings</span>
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

                {
                    session ? (
                        <AddReview product={product}/>
                    ):(
                        <button
                        onClick={()=> signIn()}
                        className={styles.login_btn}>Anda belum login</button>
                    )
                }
            </div>
        </div>
    )
}
