import styles from './styles.module.scss'
import { SelectControl } from './SelectControl'
import { useState } from 'react'
import { Rating } from '@mui/material'
import Images from './Images'
export const AddReview = ({ product }) => {
    const [size, setSize] = useState("")
    const [style, setStyle] = useState("");
    const [fit, setFit] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState();
    const [images, setImages] = useState([]);

    return (
        <div className={styles.reviews__add}>
            <div className={`${styles.reviews__add_wrap}`}>
                <div className={styles.flex} style={{ gap: "10px" }}>

                    <SelectControl
                        property={size}
                        text="Size"
                        data={product.allSizes.filter((x) => x.size !== size)}
                        handleChange={setSize} />

                    <SelectControl
                        property={style}
                        text="Style"
                        data={product.colors.filter((x) => x !== style)}
                        handleChange={setStyle} />

                    <SelectControl
                        property={fit}
                        text="How does it fit"
                        data={fits.filter((x) => x !== style)}
                        handleChange={setFit} />
                </div>
                <Images images={images} setImages={setImages} />
                <textarea
                    name="review"
                    value={review}
                    id=""
                    onChange={(e) => setReview(e.target.value)}
                    placeholder='Tambahkan Review Anda'
                />

                <Rating
                    name='half-rating-read'
                    defaultValue={0}
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    precision={0.5}
                    style={{ color: "#facf19", fontSize: "2rem", marginTop:"1rem"}}
                />

                <button className={styles.login_btn}>Tambahkan Review</button>
            </div>
        </div>
    )
}

let fits = ["Small", "True to size", "Large"];