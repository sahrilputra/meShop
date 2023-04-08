import styles from './styles.module.scss';
import { useState, useEffect } from "react";

export const CartHead = ({ cartItems, selected, setSelected }) => {
    const [active, setActive] = useState();
    const handleSelect = () => {
        if (selected.length !== cartItems.length) {
            setSelected(cartItems);
        } else {
            setSelected([]);
        }
    };
    return (
            <div className={`${styles.cart__header} ${styles.card}`}>
                <h1>Item Summary({cartItems.length})</h1>
                <div className={styles.flex} onClick={() => handleSelect()}>
                    <div
                        className={`${styles.checkbox} ${active ? styles.active : ""}`}
                    ></div>
                    <span>Select all items</span>
                </div>
            </div>
    )
}
