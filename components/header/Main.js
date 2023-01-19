import styles from './styles.module.scss';
import { RiShoppingCart2Line } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import Link from 'next/link';
import { useSelector } from 'react-redux';
export const Main = () => {
    const {cart} = useSelector((state) => ({...state})) 
  return (
    <div className={styles.main}>
        <div className={styles.main__container}>
            <Link href="/" legacyBehavior>
            <a className={styles.logo}>
                <img src="../../../logo.png" alt="" />
            </a>
            </Link>
            <div className={styles.search}>
                <input type="text" placeholder='Search...' />
                <div className={styles.search__icon}>
                <RiSearch2Line/>
                </div>
            </div>
            <Link href='/cart' legacyBehavior>
                    <a className={styles.cart}>
                        <RiShoppingCart2Line />
                        <span>{cart.length}</span>
                    </a>
                </Link>
        </div>
    </div>
  )
}
