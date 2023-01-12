import styles from './styles.module.scss'
import { CgArrowsExchangeV } from "react-icons/cg";
import { MdSecurity, MdOutlineAccountCircle, MdAccountCircle } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { RxCaretDown } from "react-icons/rx";
export const Top = () => {
    const acc = document.getElementsByClassName('account');
  return (
    <div className={styles.top}>
        <div className={styles.top__container}>
            <div></div>
            <ul className={styles.top__list}>
                <li>
                    <span><CgArrowsExchangeV /> IDR </span>
                </li>
                <li>
                    <span> <MdSecurity/> Buyer Protection</span>
                </li>
                <li>
                    <span>Costumer Services</span>
                </li>
                <li>
                    <span>Help</span>
                </li>
                <li>
                    <span> <AiOutlineHeart/> Whislist</span>
                </li>
                <li>
                    <span className='account'>Account <MdOutlineAccountCircle/> <RxCaretDown/></span>
                </li>
            </ul>
        </div> 
    </div>
  )
}
