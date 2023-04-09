import styles from './styles.module.scss'

export const PaymentMethods = () => {
    return (
        <div className={`${styles.card} ${styles.cart__method}`}>
            <h2 className={styles.header}>Metode Pembayaran</h2>
            <div className={styles.images}>
                <img src="../../../payment/Visa.webp" alt="" />
                <img src="../../../payment/Mastercard.png" alt="" />
                <img src="../../../payment/paypal.png" alt="" />
            </div>
            <h2 className={styles.header}>Buyer Protection</h2>
            <div className={styles.protection}>
                Bebas layanan refound kapan saja, jika barang tidak sesuai dengan deskripsi atau 
                tidak terkirim.
            </div>
        </div>

    )
}
