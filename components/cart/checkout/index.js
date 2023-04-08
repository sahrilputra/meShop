import styles from './styles.module.scss'

export const Checkout = ({ subTotal, shippingFee, total, selected }) => {
    return (
        <>
            <div className={`${styles.cart__header} ${styles.card}`}>
                <h2>Pesanan Anda</h2>
                <div className={styles.cart__checkout_line}>
                    <span>Subtotal</span>
                    <span>USD${subTotal}</span>
                </div>
                <div className={styles.cart__checkout_line}>
                    <span>Pengiriman</span>
                    <span>+{shippingFee}</span>
                </div>
                <div className={styles.cart__checkout_total}>
                    <span>Total</span>
                    <span>US${total}</span>
                </div>
                <div className={styles.submit}>
                    <button
                        disabled={selected.length == 0}
                        style={{
                            background: `${selected.length == 0 ? "#eee" : ""}`,
                            cursor: `${selected.length == 0 ? "not-allowed" : ""}`,
                        }}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </>
    )
}