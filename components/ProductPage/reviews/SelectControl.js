/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import styles from './styles.module.scss'
import { IoArrowDown } from 'react-icons/io5'
export const SelectControl = ({ property, text, data, handleChange }) => {
    console.log(data);

    const [visible, setVisible] = useState(false);
    return (
        <div className={styles.select}>
            {text}: 
            <div className={styles.select__header}
                onMouseOver={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                <span
                    className={`${styles.flex} ${styles.select__header_wrap}`}
                    style={{ padding: "0 5px" }}
                >
                    {
                        text == "Size" ? (
                            property || `Select ${text}`
                        ) : text == "Style" && property.image ? (
                            <img src={property.image}
                                alt="properti image" />
                        ) : (
                            "Pilih"
                        )
                    }
                    <IoArrowDown />
                </span>
                {
                    visible &&
                    <ul
                        className={styles.select__header_menu}
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        {
                            data.map((item, i) => {
                                if (text == "Size") {
                                    return (
                                        <>
                                            <li key={i}
                                                onClick={() => handleChange(item.size)}
                                            >
                                                <span>{item.size}</span>
                                            </li>
                                        </>
                                    );
                                } if (text == "Style") {
                                    return (
                                        <>
                                            <li key={i}
                                                onClick={() => handleChange(item)}
                                                style={{ background: `${item.color}` }}
                                            >
                                                <span >
                                                    <img src={item.image} alt="image colors" />
                                                </span>
                                            </li>
                                        </>
                                    );
                                }
                            })
                        }
                    </ul>
                }
            </div>
        </div>

    )
}
