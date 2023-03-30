/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss';
import Link from 'next/link';
import { MdPlayArrow } from "react-icons/md";
export const CartHeader = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__left}>
            <Link href="/">
              <img src="../../../logo.png" alt="" />
            </Link>
          </div>
          <div className={styles.header__right}>
            <Link href="/browse">
              Lanjut berbelanja
              <MdPlayArrow />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

