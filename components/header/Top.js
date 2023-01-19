import styles from './styles.module.scss'
import { CgArrowsExchangeV } from "react-icons/cg";
import { MdSecurity, MdOutlineAccountCircle, MdAccountCircle } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { RxCaretDown } from "react-icons/rx";
import { useState } from 'react';
import { UserMenu } from './UserMenu';
export const Top = () => {
    const [loggin, setLoggedin] = useState(true);
    const [visible, setVisible,] = useState(false);
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.li}>
                        <span><CgArrowsExchangeV /> IDR </span>
                    </li>
                    <li className={styles.li}>
                        <span> <MdSecurity /> Buyer Protection</span>
                    </li>
                    <li className={styles.li}>
                        <span>Costumer Services</span>
                    </li>
                    <li className={styles.li}>
                        <span>Help</span>
                    </li>
                    <li className={styles.li}>
                        <span> <AiOutlineHeart /> Whislist</span>
                    </li>
                    <li className={styles.li}
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        {loggin ? (
                            <li className={styles.li}>
                                <div className={styles.flex}>
                                    <img
                                        src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"
                                        alt="Avatar" />
                                    <span>Sahril</span>
                                    <RxCaretDown />
                                </div>
                            </li>
                        ) : (
                            <li className={styles.li}>
                                <div className={styles.flex}>
                                    <span>Account</span>
                                    <RxCaretDown />
                                </div>
                            </li>
                        )}
                        {
                            visible && <UserMenu loggin={loggin} />
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}
