
import styles from "./styles.module.scss";

export const Payment = () => {
  return (
    <div className={styles.footer__payment}>
    <h3>WE ACCPET</h3>
    <div className={styles.footer__flexwrap}>
      <img src="../../../payment/visa.webp" alt="" />
      <img src="../../../payment/mastercard.png" alt="" />
      <img src="../../../payment/paypal.png" alt="" />
    </div>
  </div>
  )
}
