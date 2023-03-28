import styles from './styles.module.scss'
import { SelectControl } from './SelectControl'
import { useState } from 'react'
export const AddReview = ({ product }) => {
    const [size, setSize] = useState("")
    const [style, setStyle] = useState("");

    return (
        <div className={styles.reviews__add}>
            <div className={`${styles.flex} ${styles.wrap}`}>
                <div className={styles.flex} style={{ gap: "10px" }}>
                
                    <SelectControl 
                    property={size} 
                    text="Size" 
                    data={product.allSizes.filter((x) => x.size !== size)} 
                    handleChange={setSize}/>
                    
                    <SelectControl 
                    property={style} 
                    text="Style" 
                    data={product.colors.filter((x) => x !== style)} 
                    handleChange={setStyle}/>
                </div>
            </div>
        </div>
    )
}
